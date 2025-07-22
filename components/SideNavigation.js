import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar"; // 通常用於在 Drawer 頂部留出與 App Bar 對應的空間
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router"; // 用於 Next.js 的路由導航
import Link from "next/link"; // 用於 Next.js 的 Link 組件
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from "@mui/material";
// 定義側邊導覽列的寬度，通常與您在 Layout 中的設定一致
const drawerWidth = 240;

export default function SideNavigation() {
  const router = useRouter(); // 獲取當前路由
  // 您可以根據當前路由來設定選中的項目，類似於 BottomNavigation 的 value
  // 這裡我們預設讓它保持未選中，或根據路由自行判斷
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, path, index) => {

    if(path === "/account") {
      
      
      return
    }
    setSelectedIndex(index);
    router.push(path); // 導航到點擊的路徑
  };

  // 導覽項目數據，包含文字、圖標和對應的路徑
  const navItems = [
    { label: "登出", icon: <AccountCircleIcon />, path: "/logout" },
    { label: "圖表", icon: <BarChartIcon />, path: "/charts" },
    { label: "新增記帳", icon: <AddCircleIcon />, path: "/" },
    { label: "記帳本", icon: <ListAltIcon />, path: "/records" },
    { label: "設定", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      variant="permanent" // 桌面版通常設定為 permanent (常駐)
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {/* 如果您在佈局中有一個 App Bar，通常會在 Drawer 頂部放置一個 Toolbar 
        來推開內容，與 App Bar 的高度對齊。
        如果沒有 App Bar，可以移除或調整這個 Toolbar。
        */}
      <Box sx={{ overflow: "auto" }}>
        {/* <Menu open={true}>
          <MenuItem>
          登出
          </MenuItem>
        </Menu> */}
        <List>
          {navItems.map((item, index) => (
            <ListItem key={item.label} disablePadding>
              {/* 使用 Next.js 的 Link 組件進行導航 */}
              <Link href={item.path} passHref legacyBehavior>
                <ListItemButton
                  component="a" // Link 的子元素需要是一個可接受 'href' 的元素
                  selected={router.pathname === item.path} // 根據當前路徑判斷是否選中
                  onClick={(event) =>
                    handleListItemClick(event, item.path, index)
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
