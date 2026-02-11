import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  
  const isAuthPage = request.nextUrl.pathname.startsWith("/") ||
                     request.nextUrl.pathname.startsWith("/register");
   
  // Se NÃO tiver token → redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (token && request.nextUrl.href !== request.url) {
    return NextResponse.redirect(new URL(request.url));
  }else if (token && isAuthPage && request.nextUrl.href !== request.url) {
    // Se tiver token e tentar acessar a página de login ou registro → redireciona para /members
    return NextResponse.redirect(new URL("/members", request.url));
  }
    return NextResponse.next();
}

// Quais rotas devem ser protegidas
export const config = {
  matcher: [
    "/members/:path*",    
    "/meetings/:path*",  
    "/opportunities/:path*",   
    "/messages/:path*",
    "/invoices/:path*",
  ]
};


