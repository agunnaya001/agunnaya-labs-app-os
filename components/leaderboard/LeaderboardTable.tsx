'use client';

import React, { useState } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LeaderboardEntry {
  rank: number;
  name: string;
  wins: number;
  winRate: number;
  earnings: string;
  level: number;
}

export default function LeaderboardTable() {
  const [tab, setTab] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'ShadowMaster', wins: 256, winRate: 78, earnings: '$8,450', level: 32 },
    { rank: 2, name: 'PhantomKnight', wins: 243, winRate: 75, earnings: '$7,890', level: 31 },
    { rank: 3, name: 'IceStorm', wins: 198, winRate: 72, earnings: '$6,540', level: 29 },
    { rank: 4, name: 'Player_42', wins: 182, winRate: 68, earnings: '$5,200', level: 28 },
    { rank: 5, name: 'NovaBlast', wins: 167, winRate: 65, earnings: '$4,890', level: 26 },
  ];

  return (
    <div className="glass p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-neon-green" />
          Global Leaderboard
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {(['weekly', 'monthly', 'alltime'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t
                ? 'text-neon-green border-b-2 border-neon-green'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'weekly' ? 'This Week' : t === 'monthly' ? 'This Month' : 'All Time'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">#</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Player</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Wins</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Win Rate</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Earnings</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Level</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry) => (
              <tr
                key={entry.rank}
                className="border-b border-white/10 hover:bg-black/20 transition-colors"
              >
                <td className="py-3 px-2">
                  <div className="flex items-center justify-center">
                    {entry.rank === 1 && <span className="text-xl">🥇</span>}
                    {entry.rank === 2 && <span className="text-xl">🥈</span>}
                    {entry.rank === 3 && <span className="text-xl">🥉</span>}
                    {entry.rank > 3 && (
                      <span className="text-muted-foreground font-semibold">{entry.rank}</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="font-semibold text-foreground">{entry.name}</span>
                </td>
                <td className="py-3 px-2 text-foreground">{entry.wins}</td>
                <td className="py-3 px-2">
                  <Badge className="bg-neon-green/20 text-neon-green border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {entry.winRate}%
                  </Badge>
                </td>
                <td className="py-3 px-2">
                  <span className="text-neon-purple font-semibold">{entry.earnings}</span>
                </td>
                <td className="py-3 px-2">
                  <Badge className="bg-neon-purple/20 text-neon-purple border-0">
                    Lv {entry.level}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <div>
          <span className="text-muted-foreground text-sm">You rank #4 globally</span>
        </div>
        <button className="text-neon-green text-sm font-semibold hover:text-neon-green/80 transition-colors">
          View Full Leaderboard →
        </button>
      </div>
    </div>
  );
}
