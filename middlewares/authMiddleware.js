
import { NextResponse } from 'next/server'
import UserContext from '../store/user-context'
import { cookies } from 'next/headers'


export function authMiddleware(request) {
  // 檢查是否有 token（從 cookie 或其他地方）
  

  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl
  // 定義需要保護的路徑
  const protectedPaths = ['/','/charts', '/records', '/admin']
  const authPaths = ['/login', '/register']
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  )
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))
  
  // 如果是受保護的路徑但沒有 token，重定向到登入頁
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  // 如果已經登入，訪問註冊或登入時就直接轉回首頁
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return null
}


