import Router from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Nylas from 'nylas';
Nylas.config({
    clientId: process.env['NYLAS_CLIENT_ID'],
    clientSecret: process.env['NYLAS_CLIENT_SECRET'],
});
console.log(process.env['NYLAS_ACCESS_TOKEN'])
const nylas = Nylas.with(process.env['NYLAS_ACCESS_TOKEN']);
const router = Router();

// Endpoint for Register
router.post("/", async (req, res) => {
    console.log(req.body, '-------')
    const { firstName, lastName, email, password, isInterpreter, companyInfo, website, contact, address, avatar } = req.body;
    if (isInterpreter && (!firstName || !lastName || !email || !password)) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }
    if (!isInterpreter && (!firstName || !email || !password || !companyInfo || !contact || !address || !avatar)) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: "User Already Exists!" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    let emailConfirmed = false;
    const newUser = new User({
        firstName,
        lastName,
        email,
        avatar,
        passwordHash,
        isInterpreter,
        companyInfo,
        address,
        website,
        contact,
        emailConfirmed
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
        {
            userId: savedUser._id,
            isInterpreter: isInterpreter,
            emailConfirmed: false,
        },
        process.env["JWT_SECRET"],
        {
            expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
        }
    );

    // sending verify email
    let emailVerifyToken = jwt.sign(
        {
            userId: savedUser._id
        },
        process.env["JWT_EMAIL_VERIFY_SECRET"]
    );
    let verifyUrl = `${process.env["FRONT_URL"]}/verifyEmail?token=${emailVerifyToken}`;
    const draft = nylas.drafts.build({
        subject: 'Verify Email',
        body: `<html>
                 Please click <a href="${verifyUrl}">this url</a> to verify your email!
                </html>`,
        to: [{ name: 'My Event Friend', email: savedUser.email }]
    });
    draft.send();

    res.send({ token: token });
});

// Endpoint for Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email or Password is missing" });
    }

    const matchUser = await User.findOne({ email });

    if (!matchUser) {
        return res.status(401).json({ msg: "Email or Password is invalid!" });
    }

    const matchPassword = await bcrypt.compare(
        password,
        matchUser.passwordHash
    );

    if (!matchPassword) {
        return res.status(401).json({ msg: "Email or Password is invalid!" });
    }
    const token = jwt.sign(
        {
            userId: matchUser._id,
            isInterpreter: matchUser.isInterpreter,
            emailConfirmed: matchUser.emailConfirmed,
        },
        process.env["JWT_SECRET"],
        {
            expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
        }
    );
    console.log(process.env["COOKIE_SECURE"])
    console.log(matchUser._id, 'id')
    res.send({ token: token, id: matchUser._id });
});

// Endpoint for Logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
});

// Endpoint to check if logged in
router.get("/loggedin", (req, res) => {
    if (!req.user) {
        return res.json({ loggedIn: false, emailConfirmed: false });
    }
    if (req.user.emailConfirmed)
        return res.json({ loggedIn: true, emailConfirmed: true });
    else
        return res.json({ loggedIn: true, emailConfirmed: false });


});
router.get("/sendVerifyEmail", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Invalid Token" });
    }

    User.findById(req.user.userId).then(user => {
        if (user.emailConfirmed)
            return res.json({ status: 1, msg: "Already Email Verified!" })
        let emailVerifyToken = jwt.sign(
            {
                userId: user._id
            },
            process.env["JWT_EMAIL_VERIFY_SECRET"]
        );
        let verifyUrl = `${process.env["FRONT_URL"]}/verifyEmail?token=${emailVerifyToken}`;
        const draft = nylas.drafts.build({
            subject: 'Verify Email',
            body: `<html>
                             Please click <a href="${verifyUrl}">this url</a> to verify your email!
                            </html>`,
            to: [{ name: 'My Event Friend', email: user.email }]
        });
        draft.send().then(message => {
            return res.json({ status: 2, msg: "Successfully verification email was sent!" });
        }).catch(err => {
            return res.json({ status: 3, msg: "Error in verification email!" });
        })

    }).catch(err => {
        console.log(err);
        return res.status(401).json({ msg: "Invalid Token3" });
    })
});

router.post("/sendResetEmail", (req, res) => {


    User.findOne({ email: req.body.email }).then(user => {
        let emailVerifyToken = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env["JWT_SECRET"]
        );
        let verifyUrl = `${process.env["FRONT_URL"]}/resetPassword?token=${emailVerifyToken}`;
        const draft = nylas.drafts.build({
            subject: 'Reset Password',
            body: `<html>
                             Please click <a href="${verifyUrl}">this url</a> to reset your password!
                            </html>`,
            to: [{ name: 'My Event Friend', email: user.email }]
        });
        draft.send().then(message => {
            return res.json({ status: 2, msg: "Successfully reset email was sent!" });
        }).catch(err => {
            return res.json({ status: 3, msg: "Error in sending reset email!" });
        })

    }).catch(err => {
        return res.status(401).json({ msg: "Not Found Email!" });
    })
});

router.get("/verifyEmail", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
    jwt.verify(req.query.token, process.env['JWT_EMAIL_VERIFY_SECRET'], async (error, decoded) => {

        if (error) {
            return res.status(401).json({ msg: "Invalid Verification Token" });
        }
        else if (req.user.userId !== decoded.userId) {
            return res.status(401).json({ msg: "Please Open verification page on the same browser in which you logged in!" });
        } else {
            let result = await User.findByIdAndUpdate(decoded.userId, { emailConfirmed: true });
            console.log(result, decoded.userId)
            const token = jwt.sign(
                {
                    userId: req.user.userId,
                    isInterpreter: req.user.isInterpreter,
                    emailConfirmed: true
                },
                process.env["JWT_SECRET"],
                {
                    expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                }
            );
            return res.json({ token: token });
        }
    })

});

router.post("/resetPassword", (req, res) => {
    let { email, token, newpassword, confirmpassword } = req.body;
    jwt.verify(token, process.env['JWT_SECRET'], async (error, decoded) => {
        if (error) {
            return res.status(401).json({ msg: "Invalid Reset Token" });
        }
        else if (decoded.email !== email) {
            return res.status(401).json({ msg: "Invalid Reset Token" });
        } else {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(newpassword, saltRounds);
            console.log(decoded.userId, passwordHash, newpassword)
            User.findByIdAndUpdate(decoded.userId, { passwordHash: passwordHash, emailConfirmed: true })
                .then(user => {
                    const newToken = jwt.sign(
                        {
                            userId: user._id,
                            isInterpreter: user.isInterpreter,
                            emailConfirmed: true
                        },
                        process.env["JWT_SECRET"],
                        {
                            expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                        }
                    );
                    return res.json({ token: newToken });
                }).catch(error => {
                    return res.status(401).json({ msg: "New Email Save Error!" });
                })

            // const token = jwt.sign(
            //     {
            //         userId: req.user._id,
            //         isUser: req.user.isUser,
            //         emailConfirmed: true
            //     },
            //     process.env["JWT_SECRET"],
            //     {
            //         expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
            //     }
            // );

        }
    })

});

export default router;
