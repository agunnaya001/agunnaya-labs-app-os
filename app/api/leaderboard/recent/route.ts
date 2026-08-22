import { NextResponse } from 'next/server'
import { getLeaderboard } from '@/app/actions/data'

export async function GET() {
  try {
    const data = await getLeaderboard(50)
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/leaderboard/recent error', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
