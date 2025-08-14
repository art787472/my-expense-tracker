// next.config.js

const withTM = require('next-transpile-modules')([
  '@mui/x-date-pickers',
  // 如果您還使用其他 MUI X 模組，請也在此處添加，例如：
   '@mui/x-data-grid',
   '@mui/x-charts',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 您其他的 Next.js 配置
   eslint: {
    // 在生產構建時忽略 ESLint 錯誤
    ignoreDuringBuilds: true,
  },
  basePath: '/expencetracker'
};

module.exports = withTM(nextConfig);