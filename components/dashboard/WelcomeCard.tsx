'use client'

import { useEffect, useState } from 'react'
import { Wallet } from 'lucide-react'
import { useAccount, useBalance } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { getCurrentUserStats } from '@/app/actions/data'

interface UserStats {
  name: string | null
  score: number
  wins: number
  losses: number
  winRate: string | null
}

export default function WelcomeCard() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const result = await getCurrentUserStats()
        setStats(result)
      } catch (error) {
        console.error('[v0] Failed to load user stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="glass glow-green-hover p-6 rounded-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="text-neon-green">{stats?.name || 'Player'}</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mb-4">
            Your Web3 gaming hub on Base Mainnet. Current score: {stats?.score || 0}
          </p>

          {/* Wallet Status */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
              <Wallet className="w-4 h-4 text-neon-green" />
              {isConnected ? (
                <>
                  <span className="text-xs text-muted-foreground">Connected:</span>
                  <code className="text-xs font-mono text-foreground">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </code>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Wallet not connected</span>
              )}
            </div>
            {balance && (
              <div className="bg-black/40 px-4 py-2 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Balance</div>
                <div className="text-lg font-bold text-neon-green">
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Connect */}
        <div className="flex gap-3 w-full md:w-auto">
          <ConnectButton />
        </div>
      </div>

      {!loading && stats && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-black/40 p-3 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Wins</p>
            <p className="text-xl font-bold text-neon-green">{stats.wins}</p>
          </div>
          <div className="bg-black/40 p-3 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Losses</p>
            <p className="text-xl font-bold text-neon-purple">{stats.losses}</p>
          </div>
          <div className="bg-black/40 p-3 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
            <p className="text-xl font-bold text-neon-cyan">
              {stats.winRate ? `${parseFloat(stats.winRate).toFixed(1)}%` : '0%'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
