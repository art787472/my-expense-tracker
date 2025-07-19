import BottomNavigationBar from "../components/Select/BottomNavigation";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import SideNavigation from "./SideNavigation";
import useMediaQuery from "@mui/material/useMediaQuery"; // 響應式判斷
import { useTheme } from "@mui/material/styles"; // 獲取 MUI 主題斷點
import { Box } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";

const drawerWidth = 240;
// <main className={styles.main}>
function Layout({ children }) {
  const theme = useTheme();
  // 判斷是否為桌面裝置 (例如，大於等於 md 斷點)。您可以根據需求調整斷點。
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {!isDesktop && (
        <Box component={"main"} sx={{ width: "100%", height: `100dvh` }}>
          
          <Container
            sx={{
              overflowX: "hidden",
              overflowY: "auto",
              height: `calc(100% - 56px)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </Container>
          <BottomNavigationBar
            sx={{
              width: "100%",
              position: "fixed", // 固定在底部
              bottom: 0,
              left: 0,
              zIndex: 1100, // 確保在其他內容之上
              borderTop: "1px solid rgba(0, 0, 0, 0.12)", // 可選的頂部邊界
            }}
          />
        </Box>
      )}
      {isDesktop && (
        <Box component={"main"} sx={{ width: "100%" }}>
          
          <Box sx={{ display: "flex" }}>
            <Box
              component="nav"
              sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
              aria-label="primary navigation"
            >
              {/* 渲染您的 SideNavigation 元件 */}
              <SideNavigation />
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1, // 讓主內容區塊佔滿剩餘空間
                p: 3, // 內容區域的 padding
                width: { sm: "100%", md: `calc(100% - ${drawerWidth}px)` }, // 桌面版時，內容寬度減去導覽列寬度
                minHeight: "100dvh", // 確保內容區塊至少佔滿整個視窗高度
                pb: { xs: "56px", md: "0px" }, // 行動版為底部導覽列留出空間 (約 56px 高)
                // 如果您有 App Bar (頂部固定導覽列)，可以在這裡增加一個 Toolbar 來提供佔位空間，避免內容被遮蓋
                // overflowY: 'auto', // 如果內容可能超出螢幕，啟用垂直滾動
              }}
            >
              <Toolbar />
              {/* 如果有 App Bar，您可以在這裡放置一個 <Toolbar /> 來推開內容，避免內容被 App Bar 遮擋 */}
              {children}
              {/* 這裡會渲染您的頁面內容 (例如來自 pages/index.js 的內容) */}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Layout;
