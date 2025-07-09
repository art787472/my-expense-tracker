import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import { Link as RouterLink, MemoryRouter, StaticRouter } from 'react-router';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">帳戶</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="account"
          onChange={handleChange}
        >
          <MenuItem value={10}>銀行</MenuItem>
          <MenuItem value={20}>Visa</MenuItem>
          <MenuItem value={30}>行動支付</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
