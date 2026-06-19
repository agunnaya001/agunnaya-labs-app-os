'use client';

import React from 'react';
import {
  Swords,
  Coins,
  TrendingUp,
  Users,
  Gift,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: 'green' | 'purple';
}

function ActionCard({ icon, label, description, color }: ActionCardProps) {
  const colorClass = color === 'green' ? 'text-neon-green' : 'text-neon-purple';
  const hoverClass = color === 'green' ? 'hover:shadow-[0_0_30px_rgba(0,255,157,0.3)]' : 'hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]';

  return (
    <Button
      className={`glass ${hoverClass} p-6 h-auto flex flex-col items-start gap-3 transition-all duration-200 group`}
      variant="ghost"
    >
      <div className={`${colorClass} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="flex flex-col items-start gap-1">
        <div className="font-bold text-foreground text-left">{label}</div>
        <div className="text-xs text-muted-foreground text-left">{description}</div>
      </div>
    </Button>
  );
}

export default function QuickActionGrid() {
  const actions = [
    {
      icon: <Swords className="w-6 h-6" />,
      label: 'Join Tournament',
      description: 'Enter a live arena battle',
      color: 'green' as const,
    },
    {
      icon: <Coins className="w-6 h-6" />,
      label: 'Swap Tokens',
      description: 'Trade ARENA, AGL, CHONK9K',
      color: 'purple' as const,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Stake & Earn',
      description: 'Lock tokens for APY',
      color: 'green' as const,
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'View Profile',
      description: 'Check your achievements',
      color: 'purple' as const,
    },
    {
      icon: <Gift className="w-6 h-6" />,
      label: 'Claim Rewards',
      description: 'Collect pending earnings',
      color: 'green' as const,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Marketplace',
      description: 'Buy/sell NFT champions',
      color: 'purple' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {actions.map((action, idx) => (
        <ActionCard key={idx} {...action} />
      ))}
    </div>
  );
}
