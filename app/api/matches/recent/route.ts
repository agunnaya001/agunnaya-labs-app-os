import { NextResponse } from 'next/server'
import { getRecentMatches } from '@/app/actions/data'

export async function GET() {
  try {
    const data = await getRecentMatches(10)
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/matches/recent error', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
