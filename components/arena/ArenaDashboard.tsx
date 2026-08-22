'use client'

import { useState, useEffect } from 'react'
import { Swords, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Match {
  id: string
  player1Name: any
  player2Name: any
  winnerName: any
  player1Score: number
  player2Score: number
  status: string
  createdAt: Date
}

export default function ArenaDashboard() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const res = await fetch('/api/matches/recent')
        if (!res.ok) throw new Error('Failed to fetch recent matches')
        const data = await res.json()
        setMatches(data)
      } catch (error) {
        console.error('[v0] Failed to load recent matches:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Swords className="w-5 h-5 text-neon-green" />
        Arena - Recent Battles
      </h3>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass p-4 rounded-lg h-24 animate-pulse bg-background/50" />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="glass p-6 rounded-lg text-center">
          <p className="text-muted-foreground">No matches yet. Start playing in the arena!</p>
          <Button
            size="sm"
            className="mt-4 bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]"
          >
            Enter Arena
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <div key={match.id} className="glass p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-sm">Battle</h4>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    match.status === 'completed' ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-purple/20 text-neon-purple'
                  }`}
                >
                  {match.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Players:</span>
                  <div className="flex gap-2">
                    <span className="text-foreground">{match.player1Name || 'Unknown'}</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="text-foreground">{match.player2Name || 'Unknown'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Score:</span>
                  <span className="text-foreground font-semibold">{match.player1Score} - {match.player2Score}</span>
                </div>
                {match.winnerName && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Winner:</span>
                    <span className="text-neon-green font-semibold">{match.winnerName}</span>
                  </div>
                )}
              </div>

              <Button
                size="sm"
                className="w-full bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
