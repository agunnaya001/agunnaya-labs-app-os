'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  leaderboardEntry,
  activityLog,
  user,
  gameMatch,
  nftItem,
} from '@/lib/db/schema'
import { and, desc, eq, limit, sql } from 'drizzle-orm'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getCurrentUserStats() {
  const userId = await getUserId()
  const result = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      score: sql`COALESCE(${leaderboardEntry.score}, 0)`,
      wins: sql`COALESCE(${leaderboardEntry.wins}, 0)`,
      losses: sql`COALESCE(${leaderboardEntry.losses}, 0)`,
      winRate: leaderboardEntry.winRate,
      rank: leaderboardEntry.rank,
    })
    .from(user)
    .leftJoin(leaderboardEntry, eq(user.id, leaderboardEntry.userId))
    .where(eq(user.id, userId))
    .limit(1)

  return result[0] || null
}

export async function getLeaderboard(limit_: number = 50) {
  const result = await db
    .select({
      id: leaderboardEntry.id,
      userId: leaderboardEntry.userId,
      rank: leaderboardEntry.rank,
      userName: user.name,
      userImage: user.image,
      score: leaderboardEntry.score,
      wins: leaderboardEntry.wins,
      losses: leaderboardEntry.losses,
      winRate: leaderboardEntry.winRate,
    })
    .from(leaderboardEntry)
    .leftJoin(user, eq(leaderboardEntry.userId, user.id))
    .orderBy(desc(leaderboardEntry.score))
    .limit(limit_)

  return result
}

export async function getActivityFeed(limit_: number = 20) {
  const userId = await getUserId()
  const result = await db
    .select({
      id: activityLog.id,
      userName: user.name,
      userImage: user.image,
      activityType: activityLog.activityType,
      description: activityLog.description,
      metadata: activityLog.metadata,
      createdAt: activityLog.createdAt,
    })
    .from(activityLog)
    .leftJoin(user, eq(activityLog.userId, user.id))
    .where(eq(activityLog.userId, userId))
    .orderBy(desc(activityLog.createdAt))
    .limit(limit_)

  return result
}

export async function getUserNFTs() {
  const userId = await getUserId()
  const result = await db
    .select()
    .from(nftItem)
    .where(eq(nftItem.userId, userId))
    .orderBy(desc(nftItem.createdAt))

  return result
}

export async function getRecentMatches(limit_: number = 10) {
  const userId = await getUserId()
  const result = await db
    .select({
      id: gameMatch.id,
      player1Name: sql`(SELECT name FROM "user" WHERE id = ${gameMatch.player1Id})`,
      player2Name: sql`(SELECT name FROM "user" WHERE id = ${gameMatch.player2Id})`,
      winnerName: sql`(SELECT name FROM "user" WHERE id = ${gameMatch.winnerId})`,
      player1Score: gameMatch.player1Score,
      player2Score: gameMatch.player2Score,
      status: gameMatch.status,
      createdAt: gameMatch.createdAt,
    })
    .from(gameMatch)
    .where(
      sql`${gameMatch.player1Id} = ${userId} OR ${gameMatch.player2Id} = ${userId}`
    )
    .orderBy(desc(gameMatch.createdAt))
    .limit(limit_)

  return result
}

export async function recordActivity(
  activityType: string,
  description: string,
  metadata?: any
) {
  const userId = await getUserId()
  const id = crypto.randomUUID()

  await db.insert(activityLog).values({
    id,
    userId,
    activityType,
    description,
    metadata,
  })

  return id
}

export async function updateUserStats(
  wins: number,
  losses: number,
  scoreGain: number
) {
  const userId = await getUserId()

  const existing = await db
    .select()
    .from(leaderboardEntry)
    .where(eq(leaderboardEntry.userId, userId))
    .limit(1)

  if (existing.length === 0) {
    await db.insert(leaderboardEntry).values({
      id: crypto.randomUUID(),
      userId,
      score: scoreGain,
      wins,
      losses,
      winRate: wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0,
    })
  } else {
    const newWins = existing[0].wins + wins
    const newLosses = existing[0].losses + losses
    const newScore = (existing[0].score || 0) + scoreGain

    await db
      .update(leaderboardEntry)
      .set({
        score: newScore,
        wins: newWins,
        losses: newLosses,
        winRate: newWins + newLosses > 0 ? (newWins / (newWins + newLosses)) * 100 : 0,
        updatedAt: new Date(),
      })
      .where(eq(leaderboardEntry.userId, userId))
  }
}
