import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLocale, locales } from './i18n/settings'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const allowedExtensions = ['.xml', '.txt', '.xml.gz']
  const allowedRoutes = ['/sitemap.xml', '/robots.txt', '/login', '/forgot-password', '/signup']

  if (allowedRoutes.includes(pathname) || allowedExtensions.some((ext) => pathname.endsWith(ext))) {
    return NextResponse.next()
  }
  // Handle Chrome DevTools requests
  if (pathname.startsWith('/.well-known/appspecific/com.chrome.devtools.json')) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Skip API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.match(/\.(ico|svg|png|jpg|jpeg|gif|webp|css|js|json)$/)
  ) {
    return NextResponse.next()
  }

  const pathSegments = pathname.split('/')
  const pathLocale = pathSegments[1]

  // If the first segment is a valid locale
  if (locales.includes(pathLocale)) {
    // If it's the default locale, redirect to remove it from URL
    if (pathLocale === defaultLocale) {
      const newPathname = `/${pathSegments.slice(2).join('/')}`
      return NextResponse.redirect(new URL(newPathname || '/', request.url))
    }
    return NextResponse.next()
  }

  // If no locale in URL and not the root path
  // if (pathname !== '/') {
  //   // Get the locale from cookie or accept-language header
  //   const acceptLanguage = request.headers.get('accept-language')?.split(',')?.[0] || defaultLocale
  //   const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  //   const locale = cookieLocale || acceptLanguage || defaultLocale

  //   // Only redirect if the detected locale is not the default
  //   if (locale !== defaultLocale) {
  //     return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  //   }
  // }
  // If no locale is provided, assume English and rewrite URL internally
  if (!pathname.startsWith('/ml') && !pathname.startsWith('/ar')) {
    const rewrittenPath = new URL(`/en${pathname}`, request.url)
    console.log('Rewriting path to:', rewrittenPath.pathname)
    return NextResponse.rewrite(rewrittenPath)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|json)$).*)'],
}
