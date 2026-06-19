'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getUserNFTs } from '@/app/actions/data'

interface NFTCard {
  id: string
  name: string
  rarity: string
  imageUrl?: string
  description?: string
}

function getRarityColor(rarity: string) {
  switch (rarity?.toLowerCase()) {
    case 'common':
      return 'bg-gray-500/20 text-gray-300'
    case 'rare':
      return 'bg-neon-green/20 text-neon-green'
    case 'epic':
      return 'bg-neon-purple/20 text-neon-purple'
    case 'legendary':
      return 'bg-yellow-500/20 text-yellow-300'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export default function NFTGrid() {
  const [nfts, setNfts] = useState<NFTCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const data = await getUserNFTs()
        setNfts(data)
      } catch (error) {
        console.error('[v0] Failed to load NFTs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNFTs()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-neon-green" />
          My Champions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-lg overflow-hidden h-40 animate-pulse bg-background/50" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-neon-green" />
        My Champions
      </h3>

      {nfts.length === 0 ? (
        <div className="glass p-8 rounded-lg text-center">
          <p className="text-muted-foreground">
            No NFTs yet. Win battles in the arena to earn champion NFTs!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="glass rounded-lg overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all group cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gradient-to-br from-neon-green/20 to-neon-purple/20 flex items-center justify-center group-hover:from-neon-green/30 group-hover:to-neon-purple/30 transition-colors relative">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="text-xs text-muted-foreground">{nft.name}</div>
                </div>
                <button className="absolute top-2 right-2 p-2 bg-black/60 rounded-lg hover:bg-neon-green/60 transition-colors">
                  <Star className="w-4 h-4 text-muted-foreground group-hover:text-neon-green" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-foreground mb-1">{nft.name}</h4>
                  <Badge className={`text-xs ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity?.toUpperCase() || 'COMMON'}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  {nft.description && (
                    <div>
                      <span className="text-muted-foreground">{nft.description}</span>
                    </div>
                  )}
                </div>

                <Button
                  size="sm"
                  className="w-full bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
