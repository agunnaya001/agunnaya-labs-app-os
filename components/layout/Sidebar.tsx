'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  Zap,
  TrendingUp,
  Users,
  ShoppingBag,
  BarChart3,
  Wand2,
  Code2,
  Wallet,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '#dashboard', color: 'text-neon-green' },
  { icon: Zap, label: 'Arena', href: '#arena', color: 'text-neon-green' },
  { icon: TrendingUp, label: 'DeFi Hub', href: '#defi', color: 'text-neon-purple' },
  { icon: Users, label: 'Identity', href: '#identity', color: 'text-neon-green' },
  { icon: BarChart3, label: 'Leaderboard', href: '#leaderboard', color: 'text-neon-purple' },
  { icon: ShoppingBag, label: 'Marketplace', href: '#marketplace', color: 'text-neon-green' },
  { icon: BarChart3, label: 'Analytics', href: '#analytics', color: 'text-neon-purple' },
  { icon: Wand2, label: 'AI Assistant', href: '#ai', color: 'text-neon-green' },
  { icon: Code2, label: 'Dev Portal', href: '#dev', color: 'text-neon-purple' },
];

export default function Sidebar({ mobile = false, onClose }: SidebarProps) {
  return (
    <div className={`${mobile ? 'w-64' : 'w-72'} bg-sidebar backdrop-blur-xl border-r border-sidebar-border flex flex-col h-full overflow-y-auto`}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-purple rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-black font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-neon-green">AGUNNAYA</span>
            <span className="text-xs text-muted-foreground">Labs</span>
          </div>
        </div>
        {mobile && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-black/40 group ${item.color}`}
            >
              <Icon className="w-5 h-5 group-hover:glow-green" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Wallet Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          className="w-full bg-gradient-to-r from-neon-green to-neon-purple text-black font-bold hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] transition-all duration-200"
          size="lg"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </div>

      {/* Footer Stats */}
      <div className="p-4 space-y-2 border-t border-sidebar-border text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Base Mainnet</span>
          <span className="text-neon-green">●</span>
        </div>
        <div className="text-muted-foreground">v1.0.0</div>
      </div>
    </div>
  );
}
