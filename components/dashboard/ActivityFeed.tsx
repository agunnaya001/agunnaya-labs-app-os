'use client'

import { useEffect, useState } from 'react'
import { Activity, CheckCircle, AlertCircle } from 'lucide-react'

interface ActivityItem {
  id: string
  userName: string | null
  userImage: string | null
  activityType: string
  description: string | null
  metadata: any
  createdAt: Date
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'match_won':
      return <CheckCircle className="w-5 h-5 text-neon-green" />
    case 'match_lost':
      return <AlertCircle className="w-5 h-5 text-neon-purple" />
    case 'achievement':
      return <span className="text-lg">⭐</span>
    case 'nft_minted':
      return <span className="text-lg">🖼️</span>
    default:
      return <Activity className="w-5 h-5 text-neon-green" />
  }
}

function ActivityItemComponent({ item }: { item: ActivityItem }) {
  const isGreen = item.activityType === 'match_won' || item.activityType === 'achievement'
  const colorClass = isGreen ? 'text-neon-green' : 'text-neon-purple'
  const bgClass = isGreen ? 'bg-neon-green/10' : 'bg-neon-purple/10'

  return (
    <div className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-b-0">
      <div className={`${bgClass} p-2 rounded-lg flex-shrink-0`}>{getActivityIcon(item.activityType)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-foreground text-sm md:text-base truncate">
            {item.userName || 'Unknown'} - {item.description}
          </p>
          <span className={`${colorClass} text-xs font-mono flex-shrink-0`}>
            {new Date(item.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const { getActivityFeed } = await import('@/app/actions/data')
        const data = await getActivityFeed(20)
        setActivities(data)
      } catch (error) {
        console.error('[v0] Failed to load activity feed:', error)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  if (loading) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Live Activity Feed</h2>
          <Activity className="w-5 h-5 text-neon-green" />
        </div>
        <p className="text-muted-foreground">Loading activity...</p>
      </div>
    )
  }

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

      {activities.length === 0 && (
        <p className="text-center py-8 text-muted-foreground">No activity yet. Start playing to see activity here!</p>
      )}

      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="text-neon-green text-sm font-semibold hover:text-neon-green/80 transition-colors">
          View All Activity →
        </button>
      </div>
    </div>
  )
}
