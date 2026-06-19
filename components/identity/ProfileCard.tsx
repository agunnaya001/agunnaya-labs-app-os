'use client';

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Zap } from 'lucide-react';

export default function ProfileCard() {
  return (
    <div className="glass p-6 rounded-lg">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 text-neon-green" />
        Player Profile
      </h3>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Player" />
          <AvatarFallback>PL</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-2xl font-bold text-foreground">Player_42</h4>
            <Badge className="bg-neon-green text-black">VERIFIED</Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-3">agunnaya.base.eth</p>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Total Wins</div>
              <div className="text-lg font-bold text-foreground">328</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
              <div className="text-lg font-bold text-neon-green">68%</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Level</div>
              <div className="text-lg font-bold text-neon-purple">18</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-neon-yellow" />
          Achievements
        </h5>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { icon: '🏆', label: 'Champion' },
            { icon: '🔥', label: 'Streak' },
            { icon: '💎', label: 'Collector' },
            { icon: '⚡', label: 'Fast Reflexes' },
          ].map((achievement, idx) => (
            <div
              key={idx}
              className="glass p-3 rounded-lg text-center hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] transition-all"
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="text-xs text-muted-foreground">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Joined</div>
            <div className="text-sm font-semibold text-foreground">Mar 15, 2024</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Last Active</div>
            <div className="text-sm font-semibold text-foreground">2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
