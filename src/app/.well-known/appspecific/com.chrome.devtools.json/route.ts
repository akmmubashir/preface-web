import { NextResponse } from 'next/server'

export async function GET() {
  // Return a simple JSON response for Chrome DevTools
  return NextResponse.json({
    name: 'Preface to Islam',
    short_name: 'Preface',
    description: 'Islamic knowledge and insights',
    start_url: '/',
    display: 'standalone',
    theme_color: '#16a34a',
    background_color: '#ffffff',
  })
}
