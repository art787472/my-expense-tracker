import { authMiddleware } from "./middlewares/authMiddleware";

export function middleware(request) {
     const middlewares = [
    
    authMiddleware
    
  ]
  
  // 依序執行每個 middleware
  for (const middlewareFunction of middlewares) {
    const result = middlewareFunction(request)
    
    // 如果 middleware 返回 Response，立即返回（中斷執行）
    if (result) {
      return result
    }
  }
  
  // 所有 middleware 都通過，繼續正常流程
  return null
}

export const config = {
  matcher: [
    // 排除靜態文件和 API 內部路由
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}