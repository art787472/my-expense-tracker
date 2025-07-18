import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import { Link as RouterLink, MemoryRouter, StaticRouter } from 'react-router';

export default function BasicSelect({account, setAcount}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAcount(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">帳戶</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={account}
          label="account"
          onChange={handleChange}
        >
          <MenuItem value={"銀行"}>銀行</MenuItem>
          <MenuItem value={"Visa"}>Visa</MenuItem>
          <MenuItem value={"行動支付"}>行動支付</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
