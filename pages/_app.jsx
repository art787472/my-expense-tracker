import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import css from '../styles/global.css'; 
import Layout from '../components/Layout'; // 導入您的佈局組件
import { useRouter } from 'next/router'; // 導入 useRouter
import UserProvider from '../store/UserProvider'
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import UserAvatar from '../components/UserAvatar';


export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter(); // 初始化 useRouter
  const theme = useTheme(css);
  // 定義不需要導航列的路徑
  const noNavRoutes = ['/login', '/register', 'logout', '/forgot-password', '/newlogin']; // 根據您的頁面路徑調整
  const showNav = !noNavRoutes.includes(router.pathname);

  const noAvatarRoutes = ['/login', '/register', 'logout', '/forgot-password']
  const showAvatar = !noAvatarRoutes.includes(router.pathname)

  return (
   <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserProvider>
        {showNav ? (
          // 如果需要顯示導航列，則使用 Layout 包裹 Component
            
            <Layout>
              <Component {...pageProps} />
            </Layout>
        ) : (
          // 如果不需要導航列，則直接渲染 Component
          
          <Component {...pageProps} />
        )}
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
