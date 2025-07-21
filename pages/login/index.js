import * as React from "react";
import { useRouter } from 'next/router'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link"; // MUI Link for styling, use Next.js Link for routing
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NextLink from "next/link"; // Next.js Link for routing
import axios from "axios";
import UserContext from "../../store/user-context";


// 您可以定義一個自定義主題，如果沒有則使用預設主題
const defaultTheme = createTheme();

function CustomizedSnackbars({ open, setOpen }) {




  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          登入成功!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState(""); // 用於顯示錯誤訊息
  const [open, setOpen] = React.useState(false);

  const router = useRouter()

  const userCtx = React.useContext(UserContext)


  const handleSubmit = async (event) => {
    event.preventDefault(); // 防止表單預設提交行為 (頁面刷新)

    // 這裡只是前端簡單的驗證，實際登入邏輯會與後端API互動
    if (!email || !password) {
      setError("請輸入電子郵件/使用者名稱和密碼。");
      return;
    }

    const data = {
      account: email,
      password: password
    }

    try {
      const res = await axios.post('https://localhost:7283/api/account/login', data)
      
      if (res.request?.status == 200) {
        const token = res.data.data.accessToken
        const refreshToken = res.data.data.refreshToken
        const userData = res.data.data.user
        userCtx.loginUser(userData, token);

        // 仍然保存到 localStorage（為了持久化）
        localStorage['token'] = token;
        localStorage['refreshToken'] = refreshToken;
        document.cookie = `token=${token};`;

        setOpen(true);
        router.push('/');
      }
      

    } catch (err) {

      console.log(err)
      setError(err.response?.data?.message)
      

      return;
    }
    // 假設登入成功，通常會重定向到儀表板或其他頁面
    console.log({
      email: email,
      password: password,
      rememberMe: rememberMe,
    });
    setError(""); // 清除錯誤訊息

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundImage: "url(/background_image.png)", // <-- 設定背景圖片路徑
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover", // 圖片覆蓋整個容器
          backgroundPosition: "center", // 圖片居中
          display: "flex", // 啟用 Flexbox
          flexDirection: "column", // 垂直排列
          minHeight: "100vh", // 讓容器至少佔據整個視窗高度
          alignItems: "center", // 水平居中對齊內容
          justifyContent: "center", // 垂直居中對齊內容
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              p: 4, // 內部 padding
              backgroundColor: "rgba(255, 255, 255, 0.85)", // 背景半透明白色
              borderRadius: 2, // 圓角
              boxShadow: 3, // 陰影
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "first.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              登入您的帳戶
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="電子郵件 / 使用者名稱"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error && !email} // 當有錯誤且電子郵件為空時顯示錯誤狀態
                helperText={!!error && !email ? error : ""} // 顯示錯誤訊息
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error && !password} // 當有錯誤且密碼為空時顯示錯誤狀態
                helperText={!!error && !password ? error : ""} // 顯示錯誤訊息
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="記住我"
              />
              {error && ( // 顯示通用的錯誤訊息
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ mt: 1, textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                登入
              </Button>
              <Grid container>
                <Grid
                  item
                  xs
                  size={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <NextLink href="/forgot-password" passHref legacyBehavior>
                    <Link variant="body2">忘記密碼？</Link>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  size={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <NextLink href="/register" passHref legacyBehavior>
                    <Link variant="body2">{"還沒有帳戶？註冊"}</Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>


      <CustomizedSnackbars open={open} setOpen={setOpen} />
    </ThemeProvider>
  );
}
