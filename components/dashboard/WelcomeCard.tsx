'use client';

import React from 'react';
import { Wallet, Copy, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WelcomeCard() {
  const mockAddress = '0x742d...8E9F';
  const mockBalance = '2,450.50';

  return (
    <div className="glass glow-green-hover p-6 rounded-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="text-neon-green">Player</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mb-4">
            Your Web3 gaming hub on Base Mainnet. Ready to compete and earn?
          </p>

          {/* Wallet Status */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
              <Wallet className="w-4 h-4 text-neon-green" />
              <span className="text-xs text-muted-foreground">Connected:</span>
              <code className="text-xs font-mono text-foreground">{mockAddress}</code>
              <button className="ml-2 hover:text-neon-green transition-colors">
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-black/40 px-4 py-2 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">AGL Balance</div>
              <div className="text-lg font-bold text-neon-green">{mockBalance} AGL</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full md:w-auto flex-col md:flex-row">
          <Button className="flex-1 md:flex-none bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)] transition-all">
            Play Arena
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none border-neon-purple text-neon-purple hover:bg-neon-purple/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
