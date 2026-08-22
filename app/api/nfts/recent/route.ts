import { NextResponse } from 'next/server'
import { getUserNFTs } from '@/app/actions/data'

export async function GET() {
  try {
    const data = await getUserNFTs()
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/nfts/recent error', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
