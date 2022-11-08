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
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
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

export default function UpdateWorktime() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [interpreterData, setInterpreterData] = useState([])
  const [searched, setSearched] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date())
  const [totaltime, setTotalTime] = useState(0)
  const year1 = startDate.getFullYear()
  const month1 = startDate.getMonth() + 1
  const day1 = startDate.getDate()
  const year2 = endDate.getFullYear()
  const month2 = endDate.getMonth() + 1
  const day2 = endDate.getDate()
  const [flag, setFlag] = useState(false)
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
    const url = window.location.href
    const userId = url.substring(url.indexOf("user-info/:") + 11, url.length);
    console.log(userId, 'url')
    axios
      .get(`${API_URL}/auth/user_info`, { params: {
        userId,
        day: day1,
        month: month1,
        year: year1
      }
    })
      .then(res => {
        const data = res.data.data.date
        const _id = res.data.data._id
        let total = 0
        let interpreters = []
        data.map((item, index) => {
            const a1 = new Date(item.year, item.month - 1 , item.day);
            const a2 = new Date(year1, month1 - 1, day1);
            const a3 = new Date(year2, month2 - 1, day2);
            if (a1 >= a2 && a1 <= a3) {
                total += item.worktime
                item.id = _id
                interpreters.push(item)
            }
        })
        setInterpreterData(interpreters)
        console.log(interpreterData, 'data')
        setTotalTime(total)
      })
  }

  useEffect(() => {
    getContent();
  }, [startDate, endDate])

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
          _result[index].worktime = e.target.value
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
    console.log(updatedState, 'id')
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

  const add = () => {
    const url = window.location.href
    const userId = url.substring(url.indexOf("user-info/:") + 11, url.length);
    const a = {
      year: '',
      month: '',
      worktime: '',
      flag: true,
      date1: '',
      date2: '',
      language: '',
      time: '',
      updated: false,
      _id: userId
    }
    setInterpreterData((_prev) => {
      const t = [..._prev];
      t.push(a)
      return t
    })
  }

  const addStartTime = (e, index) => {
    const date = e;
    setInterpreterData(_prev => {
      const t = [..._prev]
      const date1 = new Date(date);
      t[index].date = {year: date1.getFullYear()}
      t[index].date = {month: date1.getMonth() + 1}
      t[index].date = {day: date1.getDate()}
      t[index].date1 = date
      t[index].updated = true
      return t
    })
  }

  const addEndTime = (e, index) => {
    const date = e;
    setInterpreterData(_prev => {
      const t = [..._prev]
      const date1 = new Date(date);
      t[index].date = {year: date1.getFullYear()}
      t[index].date = {month: date1.getMonth() + 1}
      t[index].date = {day: date1.getDate()}
      t[index].date2 = date
      t[index].updated = true
      return t
    })
  }

  const addLanguage = (e, index) => {
    const language = e.target.value
    setInterpreterData(_prev => {
      const t = [..._prev]
      t[index].language = language
      t[index].updated = true
      return t
    })
  }

  const addTime = (e, index) => {
    const time = e.target.value
    setInterpreterData(_prev => {
      const t = [..._prev]
      t[index].time = time
      t[index].updated = true
      return t
    })
  }

  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '50px', padding: '20px' }}>
        <DatePicker className="form-control" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
        <DatePicker className="form-control" selected={endDate} onChange={(date: Date) => setEndDate(date)} />
        <Button className="btn_save" onClick={() => add()}>Add</Button>
        <Button className="btn_save" onClick={() => saveData()}>Save</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align='left'>No</TableCell>
              <TableCell align='center'>Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Language</TableCell>  
              <TableCell align="right" colSpan={4}>Work Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? interpreterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : interpreterData
            ).map((row, index) => (
              <TableRow>
                <TableCell style={{ background: 'black', color: 'white' }}>{index + 1}</TableCell>
                <TableCell style={{ background: 'black', color: 'white' }} align="center">
                  {row.flag ? <input type="date" value={row.date1} onChange={(e) => addStartTime(e.target.value, index)} />: <>{row.year}-{row.month}-{row.day} </>}
                </TableCell>
                <TableCell style={{ background: 'black', color: 'white' }} align="center">
                  {row.flag ? <input type="date" value={row.date2} onChange={(e) => addEndTime(e.target.value, index)} />: <>{row.year}-{row.month}-{row.day} </>}
                </TableCell>
               {<TableCell style={{ background: 'black', color: 'white' }} align="center">
                  {row.flag ? <input value={row.language} onChange={(e) => addLanguage(e, index)} /> : <>{row.language}</>}
                </TableCell>
                }
                <TableCell style={{ background: 'black', color: 'white' }} align="right">
                  {row.flag ? <input value={row.time} onChange = {(e) => addTime(e, index)} /> : <input value={row.worktime} onChange={(e) => updateTime(e, row._id)} />}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            {(totaltime / 60 / 24 > 1) && <TableRow>
              <TableCell colSpan={5} align='right'>
                Total Time {(totaltime / 60 / 24).toFixed(0)} day {((totaltime - (totaltime / 60 / 24).toFixed(0) * 24 * 60) / 24).toFixed(0)} hours {totaltime - (totaltime / 60 / 24).toFixed(0) * 24 * 60 -  ((totaltime - (totaltime / 60 / 24).toFixed(0) * 24 * 60) / 24).toFixed(0) * 60} mins
              </TableCell>
            </TableRow> }
            {(totaltime / 60 > 1) && <TableRow>
              <TableCell colSpan={5} align='right'>
                Total Time {(totaltime / 60).toFixed(0) } hours {totaltime - (totaltime / 60).toFixed(0) * 60} mins
              </TableCell>
            </TableRow> }
            {(totaltime / 60 < 1) && <TableRow>
              <TableCell colSpan={5} align='right'>
                Total Time {totaltime} min
              </TableCell>
            </TableRow> }
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