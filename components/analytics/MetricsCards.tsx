'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';

export default function MetricsCards() {
  const metrics = [
    {
      label: 'Total Transactions',
      value: '12,487',
      change: '+18%',
      icon: <Zap className="w-5 h-5 text-neon-green" />,
      color: 'green',
    },
    {
      label: 'Active Players',
      value: '3,245',
      change: '+12%',
      icon: <Users className="w-5 h-5 text-neon-purple" />,
      color: 'purple',
    },
    {
      label: 'Total Volume',
      value: '$4.2M',
      change: '+28%',
      icon: <TrendingUp className="w-5 h-5 text-neon-green" />,
      color: 'green',
    },
    {
      label: 'Avg Win Rate',
      value: '54.3%',
      change: '+2.1%',
      icon: <BarChart3 className="w-5 h-5 text-neon-purple" />,
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-neon-green" />
        On-Chain Analytics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`glass p-6 rounded-lg glow-${metric.color}-hover`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-semibold">{metric.label}</span>
              {metric.icon}
            </div>

            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <span className={`text-xs px-2 py-1 rounded ${
                metric.color === 'green'
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'bg-neon-purple/20 text-neon-purple'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="glass p-6 rounded-lg">
        <h4 className="font-semibold text-foreground mb-4">24h Volume Trend</h4>
        <div className="h-40 bg-black/40 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-2">Chart visualization</div>
            <div className="text-xs text-muted-foreground">Real-time data from Base Mainnet</div>
          </div>
        </div>
      </div>
    </div>
  );
}
