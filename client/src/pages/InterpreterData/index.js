import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from "axios"
import { API_URL } from "../../env"
import { TextField, Button } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function InterpreterData() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [interpreterData, setInterpreterData] = useState([])
  const [searched, setSearched] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate()
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - interpreterData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getContent = () => {
    let date = startDate.getDate()
    let month = startDate.getMonth() + 1
    let year = startDate.getFullYear()
    axios
      .get(`${API_URL}/auth/interpreterinfo`, { params: {
        day: date,
        month: month,
        year: year
      }
    })
      .then(res => {
        const data = res.data.data
        let interpreter = []
        data.map(item => {
          if (item.email !== "d.kurtiedu@gmail.com") {
            if (item.date) {
              const _date = item.date.find(work => work.year === year && work.month === month && work.day === date)
              const newItem = {...item, date: _date}  
              interpreter.push(newItem)
            } else {
              interpreter.push(item)
            }
          }
        })
        setInterpreterData(interpreter)
      })
  }

  useEffect(() => {
    getContent();
  }, [startDate])

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal.target.value)
    const filteredRows = interpreterData.filter((row) => {
      return row.firstName.includes(searchedVal.target.value) || row.lastName.includes(searchedVal.target.value) || row.phoneNumber !== undefined && row.phoneNumber.includes(searchedVal.target.value) || row._id.includes(searchedVal.target.value) || row.language !== undefined && row.language.includes(searchedVal.target.value) || row.availableTime !== undefined && row.availableTime.includes(searchedVal.target.value);
    });

    setInterpreterData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const updateTime = (e, id) => {
    
    setInterpreterData(_prev => {
      const _result = [..._prev]
      const index = _result.findIndex(_val => _val._id === id);
      if (index >= 0) {
        if(_result[index].date !== undefined) {
          _result[index].date.worktime = e.target.value
        }
        else {
          _result[index].date = {"worktime": e.target.value, "year": startDate.getFullYear(), 'month': startDate.getMonth() + 1, 'day': startDate.getDate()}
        }
        _result[index].updated = true;
      }
      return _result;
    })
  }

  const saveData = () => {
    const updatedState = interpreterData.filter(_row => _row.updated)
    let year = startDate.getFullYear();
    let month = startDate.getMonth() + 1;
    let date = startDate.getDate();
    let update = {
      updatedState, year, month, date
    }
    axios
      .post(`${API_URL}/auth/save`, update)
      .then((res) => {
        if (res.data.data === 'success') {
          alert("Successfully saved")
        }
      })
  }

  const updateAvailability = (e, id) => {
    console.log(e.target.value, '---')
    setInterpreterData(_prev => {
      const _result = [..._prev]
      const index = _result.findIndex(_val => _val._id === id);
      if (index >= 0) {
          _result[index].availableTime = e.target.value
          _result[index].updated = true;
      }
      return _result;
    })
    console.log(interpreterData, '9999')
  }

  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          value={searched}
          placeholder="insert text to search any data"
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          style={{ minWidth: '500px' }}
        />
        <Box>
          <DatePicker className="form-control" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
        {/* <Button onClick={() => saveData()}>Save</Button> */}
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? interpreterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : interpreterData
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" onClick={() => navigate(`/user-info/:${row._id}`) }>
                  {row._id}
                </TableCell>
                <TableCell component="th" scope="row" onClick={() => navigate(`/user-info/:${row._id}`) }>
                  {row.firstName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center" onClick={() => navigate(`/user-info/:${row._id}`) }>
                  {row.lastName}
                </TableCell>
                {row.availableTime === "available" &&
                  <TableCell style={{ width: 160, background: 'green', color: 'white' }} align="center">
                    <input value={row.availableTime} onChange={(e) => updateAvailability(e, row._id)} />
                  </TableCell>
                }
                {row.availableTime === "notAvailable" &&
                  <TableCell style={{ width: 160, background: 'red', color: 'white' }} align="center">
                    <input value={row.availableTime} onChange={(e) => updateAvailability(e, row._id)} />
                  </TableCell>
                }
                {row.availableTime === "schedule" &&
                  <TableCell style={{ width: 160, background: 'yellow', color: 'black' }} align="center">
                    <input value={row.availableTime} onChange={(e) => updateAvailability(e, row._id)} />
                  </TableCell>
                }
                <TableCell style={{ width: 160 }} align="center" onClick={() => navigate(`/user-info/:${row._id}`) }>
                  {row.language}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center" onClick={() => navigate(`/user-info/:${row._id}`) }>
                  {row.phoneNumber}
                </TableCell>
                <TableCell>
                  <input value={row.date ? row.date.worktime : 0} onChange={(e) => updateTime(e, row._id)} />
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={interpreterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
