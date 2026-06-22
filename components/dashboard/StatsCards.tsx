'use client';

import React from 'react';
import { TrendingUp, Award, Zap, Gift } from 'lucide-react';
import { useArenaChampionBalance, useAGLBalance, useMarketplaceListingsCount, useIsConnected } from '@/lib/hooks/useWeb3Data';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  color: 'green' | 'purple';
}

function StatCard({ icon, label, value, subtext, color }: StatCardProps) {
  const colorClass = color === 'green' ? 'text-neon-green' : 'text-neon-purple';
  const glowClass = color === 'green' ? 'glow-green-hover' : 'glow-purple-hover';

  return (
    <div className={`glass ${glowClass} p-6 rounded-xl flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
        <div className={`${colorClass}`}>{icon}</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtext && <div className="text-xs text-muted-foreground">{subtext}</div>}
      </div>
    </div>
  );
}

export default function StatsCards() {
  const { isConnected } = useIsConnected();
  const { balance: championCount, isLoading: loadingChampions } = useArenaChampionBalance();
  const { balance: aglBalance, isLoading: loadingAGL } = useAGLBalance();
  const { count: marketplaceCount, isLoading: loadingMarketplace } = useMarketplaceListingsCount();

  const stats = [
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'NFT Champions',
      value: loadingChampions ? '...' : championCount.toString(),
      subtext: isConnected ? 'On-chain' : 'Connect wallet',
      color: 'green' as const,
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: 'Win Rate',
      value: isConnected ? '—' : '0%',
      subtext: 'Coming soon',
      color: 'green' as const,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'AGL Balance',
      value: loadingAGL ? '...' : `${parseFloat(aglBalance).toFixed(2)}`,
      subtext: 'On-chain',
      color: 'purple' as const,
    },
    {
      icon: <Gift className="w-5 h-5" />,
      label: 'Marketplace Listings',
      value: loadingMarketplace ? '...' : marketplaceCount.toString(),
      subtext: 'Active now',
      color: 'purple' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
