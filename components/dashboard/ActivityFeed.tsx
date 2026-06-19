'use client';

import React from 'react';
import { Activity, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'battle' | 'stake' | 'swap' | 'reward';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: 'green' | 'purple';
}

function ActivityItemComponent({ item }: { item: ActivityItem }) {
  const colorClass = item.color === 'green' ? 'text-neon-green' : 'text-neon-purple';
  const bgClass = item.color === 'green' ? 'bg-neon-green/10' : 'bg-neon-purple/10';

  return (
    <div className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-b-0">
      <div className={`${bgClass} p-2 rounded-lg flex-shrink-0`}>{item.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-foreground text-sm md:text-base truncate">
            {item.title}
          </p>
          <span className={`${colorClass} text-xs font-mono flex-shrink-0`}>
            {item.timestamp}
          </span>
        </div>
        <p className="text-muted-foreground text-xs md:text-sm mt-1">{item.description}</p>
      </div>
    </div>
  );
}

export default function ActivityFeed() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'battle',
      title: 'Battle Victory!',
      description: 'Defeated opponent in Arena. Earned 125 ARENA tokens.',
      timestamp: '2 mins ago',
      icon: <CheckCircle className="w-5 h-5 text-neon-green" />,
      color: 'green',
    },
    {
      id: '2',
      type: 'stake',
      title: 'Staking Confirmed',
      description: '1,000 AGL locked at 45% APY for 90 days.',
      timestamp: '1 hour ago',
      icon: <Activity className="w-5 h-5 text-neon-purple" />,
      color: 'purple',
    },
    {
      id: '3',
      type: 'swap',
      title: 'Token Swap',
      description: 'Swapped 500 ARENA for 2,450.50 AGL.',
      timestamp: '3 hours ago',
      icon: <TrendingUp className="w-5 h-5 text-neon-green" />,
      color: 'green',
    },
    {
      id: '4',
      type: 'reward',
      title: 'Reward Distributed',
      description: 'Claimed 425 CHONK9K from daily login bonus.',
      timestamp: '5 hours ago',
      icon: <CheckCircle className="w-5 h-5 text-neon-purple" />,
      color: 'purple',
    },
    {
      id: '5',
      type: 'battle',
      title: 'Battle Defeat',
      description: 'Lost match vs Warrior_42. Better luck next time!',
      timestamp: '1 day ago',
      icon: <AlertCircle className="w-5 h-5 text-neon-green" />,
      color: 'green',
    },
  ];

  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Live Activity Feed</h2>
        <Activity className="w-5 h-5 text-neon-green" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItemComponent key={activity.id} item={activity} />
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="text-neon-green text-sm font-semibold hover:text-neon-green/80 transition-colors">
          View All Activity →
        </button>
      </div>
    </div>
  );
}
