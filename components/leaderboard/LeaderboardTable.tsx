'use client'

import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'

interface LeaderboardEntry {
  id: string
  userId: string
  rank: number | null
  userName: string | null
  userImage: string | null
  score: number
  wins: number
  losses: number
  winRate: string | null
}

export default function LeaderboardTable() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard/recent')
        if (!res.ok) throw new Error('Failed to fetch leaderboard')
        const data = await res.json()
        setEntries(data)
      } catch (error) {
        console.error('[v0] Failed to load leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="glass p-6 rounded-lg">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-neon-green" />
          Global Leaderboard
        </h3>
        <p className="text-muted-foreground">Loading leaderboard...</p>
      </div>
    )
  }

  return (
    <div className="glass p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-neon-green" />
          Global Leaderboard
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">#</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Player</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Score</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Wins</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Losses</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id} className="border-b border-white/10 hover:bg-black/20 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center justify-center">
                    {index === 0 && <span className="text-xl">🥇</span>}
                    {index === 1 && <span className="text-xl">🥈</span>}
                    {index === 2 && <span className="text-xl">🥉</span>}
                    {index > 2 && <span className="text-muted-foreground font-semibold">{index + 1}</span>}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="font-semibold text-foreground">{entry.userName || 'Unknown'}</span>
                </td>
                <td className="py-3 px-2 text-neon-green font-bold">{entry.score}</td>
                <td className="py-3 px-2 text-foreground">{entry.wins}</td>
                <td className="py-3 px-2 text-foreground">{entry.losses}</td>
                <td className="py-3 px-2">
                  <span className="text-neon-green font-semibold">{entry.winRate ? `${parseFloat(entry.winRate).toFixed(1)}%` : '-'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {entries.length === 0 && (
        <p className="text-center py-8 text-muted-foreground">No leaderboard data yet. Start playing to appear here!</p>
      )}

      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="text-neon-green text-sm font-semibold hover:text-neon-green/80 transition-colors">View Full Leaderboard →</button>
      </div>
    </div>
  )
}
