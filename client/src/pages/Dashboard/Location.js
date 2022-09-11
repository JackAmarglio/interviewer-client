import React, { useState, useMemo } from "react";
import Select from 'react-select'
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Location = (props) => {

  const { value, options, changeHandler } = props;
  return (
    <Box display="flex" marginTop="30px">
      <Typography style={{ marginTop: '5px' }}>Location</Typography>
      <Box marginLeft="70px" width="200px">
        <Select options={options} value={value} onChange={changeHandler} />
      </Box>
    </Box>
  )
}

export default Location