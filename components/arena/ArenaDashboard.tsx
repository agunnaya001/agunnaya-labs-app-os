'use client';

import React from 'react';
import { Swords, Trophy, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tournament {
  id: string;
  name: string;
  prize: string;
  players: number;
  status: 'active' | 'upcoming' | 'closed';
}

export default function ArenaDashboard() {
  const tournaments: Tournament[] = [
    {
      id: '1',
      name: 'Championship Series - Round 3',
      prize: '5,000 ARENA',
      players: 127,
      status: 'active',
    },
    {
      id: '2',
      name: 'Flash Tournament',
      prize: '1,500 ARENA',
      players: 42,
      status: 'active',
    },
    {
      id: '3',
      name: 'Elite Clash',
      prize: '10,000 ARENA',
      players: 256,
      status: 'upcoming',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Swords className="w-5 h-5 text-neon-green" />
        Active Tournaments
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="glass p-4 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-foreground text-sm">{tournament.name}</h4>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  tournament.status === 'active'
                    ? 'bg-neon-green/20 text-neon-green'
                    : 'bg-neon-purple/20 text-neon-purple'
                }`}
              >
                {tournament.status === 'active' ? 'LIVE' : 'SOON'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-neon-green" />
                <span className="text-muted-foreground">Prize:</span>
                <span className="text-foreground font-semibold">{tournament.prize}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-neon-purple" />
                <span className="text-muted-foreground">Players:</span>
                <span className="text-foreground font-semibold">{tournament.players}</span>
              </div>
            </div>

            <Button
              size="sm"
              className="w-full bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]"
            >
              {tournament.status === 'active' ? 'Join Now' : 'Notify Me'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
