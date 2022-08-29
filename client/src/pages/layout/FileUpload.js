import React from "react";
import ReactDom from "react-dom";

const FileUpload = () => {
  const handleFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    reader.onload = function (img) {
      ReactDom.findDOMNode(this.refs.in).value = "";
      this.props.handleFileChange(img.target.result, file);
    }.bind(this);
    reader.readAsDataURL(file);
  };
  return (
    <input
      ref="in"
      type="file"
      accept="image/*"
      onChange={handleFile}
      style={{ height: "50px" }}
    />
  )
}

export default FileUpload;