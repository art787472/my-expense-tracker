
import { NextResponse } from 'next/server'
import UserContext from '../store/user-context'
import { cookies } from 'next/headers'


export function authMiddleware(request) {
  // 檢查是否有 token（從 cookie 或其他地方）
  

  const token = request.cookies.get('token')?.value;
  
  // 定義需要保護的路徑
  const protectedPaths = ['/charts', '/profile', '/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  // 如果是受保護的路徑但沒有 token，重定向到登入頁
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  return null
}

// 配置 middleware 執行的路徑
