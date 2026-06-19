'use client';

import React from 'react';
import { TrendingUp, Coins, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeFiHub() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-neon-purple" />
        DeFi Hub
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Token Swap */}
        <div className="glass p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">Swap Tokens</h4>
            <ArrowRightLeft className="w-5 h-5 text-neon-green" />
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">From</label>
              <div className="bg-black/40 rounded-lg p-3 flex items-center justify-between">
                <span className="text-foreground">ARENA</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent text-right w-24 outline-none text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">To</label>
              <div className="bg-black/40 rounded-lg p-3 flex items-center justify-between">
                <span className="text-foreground">AGL</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent text-right w-24 outline-none text-foreground"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-neon-green to-neon-purple text-black font-bold">
              Swap
            </Button>
          </div>
        </div>

        {/* Staking */}
        <div className="glass p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">Staking</h4>
            <Coins className="w-5 h-5 text-neon-purple" />
          </div>

          <div className="space-y-3">
            <div className="bg-black/40 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">APY</div>
              <div className="text-2xl font-bold text-neon-green">45%</div>
            </div>

            <div className="bg-black/40 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Your Stake</div>
              <div className="text-2xl font-bold text-foreground">1,000 AGL</div>
              <div className="text-xs text-muted-foreground mt-1">Earning 450 AGL/year</div>
            </div>

            <Button className="w-full bg-neon-purple text-white font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.6)]">
              Manage Stake
            </Button>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-2">Total Value Locked</div>
          <div className="text-xl font-bold text-neon-green">$2.4M</div>
          <div className="text-xs text-muted-foreground mt-1">+12% this month</div>
        </div>

        <div className="glass p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-2">24h Volume</div>
          <div className="text-xl font-bold text-neon-purple">$485K</div>
          <div className="text-xs text-muted-foreground mt-1">across all tokens</div>
        </div>

        <div className="glass p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-2">Avg APY</div>
          <div className="text-xl font-bold text-neon-green">42.5%</div>
          <div className="text-xs text-muted-foreground mt-1">across pools</div>
        </div>
      </div>
    </div>
  );
}
