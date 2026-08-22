'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Award, Zap, Gift } from 'lucide-react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  subtext?: string
  color: 'green' | 'purple'
}

function StatCard({ icon, label, value, subtext, color }: StatCardProps) {
  const colorClass = color === 'green' ? 'text-neon-green' : 'text-neon-purple'
  const glowClass = color === 'green' ? 'glow-green-hover' : 'glow-purple-hover'

  return (
    <div className={`glass ${glowClass} p-6 rounded-xl flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black/20 rounded-md">{icon}</div>
          <div>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-xl font-bold text-foreground">{value}</div>
            {subtext && <div className="text-xs text-muted-foreground">{subtext}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StatsCards() {
  const [stats, setStats] = useState<any>(null)
  const [nftCount, setNftCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [userRes, nftsRes] = await Promise.all([
          fetch('/api/user/stats'),
          fetch('/api/nfts/recent'),
        ])

        if (userRes.ok) {
          const userStats = await userRes.json()
          setStats(userStats)
        }

        if (nftsRes.ok) {
          const nfts = await nftsRes.json()
          setNftCount(Array.isArray(nfts) ? nfts.length : 0)
        }
      } catch (error) {
        console.error('[v0] Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass p-6 rounded-xl h-24 animate-pulse bg-background/50" />
        <div className="glass p-6 rounded-xl h-24 animate-pulse bg-background/50" />
        <div className="glass p-6 rounded-xl h-24 animate-pulse bg-background/50" />
        <div className="glass p-6 rounded-xl h-24 animate-pulse bg-background/50" />
      </div>
    )
  }

  const displayStats = [
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'NFT Champions',
      value: nftCount.toString(),
      subtext: 'In your collection',
      color: 'green' as const,
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: 'Win Rate',
      value: stats.winRate ? `${parseFloat(stats.winRate).toFixed(1)}%` : '0%',
      subtext: 'Overall',
      color: 'green' as const,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Total Score',
      value: stats.score?.toString() || '0',
      subtext: 'All time points',
      color: 'purple' as const,
    },
    {
      icon: <Gift className="w-5 h-5" />,
      label: 'Wins',
      value: stats.wins?.toString() || '0',
      subtext: 'Matches won',
      color: 'purple' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {displayStats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  )
}
