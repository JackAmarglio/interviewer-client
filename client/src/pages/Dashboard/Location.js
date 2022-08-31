import React, { useState, useMemo } from "react";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Location = () => {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = value => {
    setValue(value)
  }

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