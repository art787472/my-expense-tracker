import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';

export default function BottomNavigationBar() {
  const [value, setValue] = React.useState(2);

  return (
    <Box sx={{ width: '100%'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="帳戶設定" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="圖表" icon={<BarChartIcon />} />
        <BottomNavigationAction label="新增記帳" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="記帳本" icon={<ListAltIcon />} />
        <BottomNavigationAction label="設定" icon={<SettingsIcon />} />
          
      </BottomNavigation>
    </Box>
  );
}