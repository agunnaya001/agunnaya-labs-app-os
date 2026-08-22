import { NextResponse } from 'next/server'
import { getActivityFeed } from '@/app/actions/data'

export async function GET() {
  try {
    const data = await getActivityFeed(20)
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/activity/recent error', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
