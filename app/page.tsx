'use client';

import { Zap, Code } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatsCards from '@/components/dashboard/StatsCards';
import QuickActionGrid from '@/components/dashboard/QuickActionGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ArenaDashboard from '@/components/arena/ArenaDashboard';
import DeFiHub from '@/components/defi/DeFiHub';
import ProfileCard from '@/components/identity/ProfileCard';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import NFTGrid from '@/components/marketplace/NFTGrid';
import MetricsCards from '@/components/analytics/MetricsCards';

export default function Page() {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 animate-in fade-in">
        {/* Welcome Section */}
        <section id="dashboard">
          <WelcomeCard />
        </section>

        {/* Stats Cards */}
        <section>
          <StatsCards />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Quick Actions</h2>
          <QuickActionGrid />
        </section>

        {/* Activity Feed */}
        <section>
          <ActivityFeed />
        </section>

        {/* Additional Sections */}
        <div className="space-y-6 pb-8">
          {/* Arena Section */}
          <section id="arena">
            <ArenaDashboard />
          </section>

          {/* DeFi Hub */}
          <section id="defi">
            <DeFiHub />
          </section>

          {/* Identity */}
          <section id="identity">
            <ProfileCard />
          </section>

          {/* Leaderboard */}
          <section id="leaderboard">
            <LeaderboardTable />
          </section>

          {/* Marketplace */}
          <section id="marketplace">
            <NFTGrid />
          </section>

          {/* Analytics */}
          <section id="analytics">
            <MetricsCards />
          </section>

          {/* AI Assistant */}
          <section id="ai" className="glass p-6 rounded-xl">
            <h3 className="text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              AI Assistant
            </h3>
            <p className="text-muted-foreground mb-4">AI-powered trading companion coming soon...</p>
          </section>

          {/* Dev Portal */}
          <section id="dev" className="glass p-6 rounded-xl">
            <h3 className="text-lg font-bold text-neon-purple mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Dev Portal
            </h3>
            <p className="text-muted-foreground mb-4">API documentation & webhooks coming soon...</p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
