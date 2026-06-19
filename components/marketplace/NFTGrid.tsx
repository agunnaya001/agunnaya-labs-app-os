'use client';

import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NFTCard {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: string;
  owner: string;
  likes: number;
}

function getRarityColor(rarity: string) {
  switch (rarity) {
    case 'common':
      return 'bg-gray-500/20 text-gray-300';
    case 'rare':
      return 'bg-neon-green/20 text-neon-green';
    case 'epic':
      return 'bg-neon-purple/20 text-neon-purple';
    case 'legendary':
      return 'bg-yellow-500/20 text-yellow-300';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export default function NFTGrid() {
  const nfts: NFTCard[] = [
    {
      id: '1',
      name: 'Phoenix Champion',
      rarity: 'legendary',
      price: '45 AGL',
      owner: 'You',
      likes: 324,
    },
    {
      id: '2',
      name: 'Frost Knight',
      rarity: 'epic',
      price: '12.5 AGL',
      owner: 'ShadowMaster',
      likes: 187,
    },
    {
      id: '3',
      name: 'Thunder Warrior',
      rarity: 'epic',
      price: '18 AGL',
      owner: 'NovaBlast',
      likes: 256,
    },
    {
      id: '4',
      name: 'Shadow Assassin',
      rarity: 'rare',
      price: '8.5 AGL',
      owner: 'PhantomKnight',
      likes: 142,
    },
    {
      id: '5',
      name: 'Fire Mage',
      rarity: 'rare',
      price: '7.2 AGL',
      owner: 'IceStorm',
      likes: 98,
    },
    {
      id: '6',
      name: 'Common Soldier',
      rarity: 'common',
      price: '2 AGL',
      owner: 'Trader_01',
      likes: 23,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-neon-green" />
        Marketplace - Champions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="glass rounded-lg overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all group cursor-pointer"
          >
            {/* Image Placeholder */}
            <div className="w-full h-40 bg-gradient-to-br from-neon-green/20 to-neon-purple/20 flex items-center justify-center group-hover:from-neon-green/30 group-hover:to-neon-purple/30 transition-colors relative">
              <div className="text-center">
                <div className="text-4xl mb-2">⚔️</div>
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
                  {nft.rarity.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-neon-green font-semibold">{nft.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="text-foreground">{nft.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Likes</span>
                  <span className="text-foreground">{nft.likes}</span>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]"
              >
                {nft.owner === 'You' ? 'Sell' : 'Buy Now'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
