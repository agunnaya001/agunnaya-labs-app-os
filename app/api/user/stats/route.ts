import { NextResponse } from 'next/server'
import { getCurrentUserStats } from '@/app/actions/data'

export async function GET() {
  try {
    const data = await getCurrentUserStats()
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/user/stats error', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
