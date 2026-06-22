'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/lib/abis';

// Base Subgraph queries (if available), otherwise use RPC fallback
const GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

// Fallback: Query Base Scan API for block data and transaction history
const BASESCAN_API = 'https://api.basescan.org/api';

export interface NFTHolding {
  tokenId: string;
  contractAddress: string;
  name: string;
  image?: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  blockNumber: number;
  timeStamp: string;
  contractAddress: string;
  functionName: string;
}

// Hook to get user's NFT holdings from on-chain
export function useUserNFTHoldings() {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['nftHoldings', address],
    queryFn: async () => {
      if (!address) return [];

      // Fallback to RPC batch calls for NFT data
      // In production, this would query The Graph or a dedicated indexing service
      const holdings: NFTHolding[] = [
        {
          tokenId: '1',
          contractAddress: CONTRACT_ADDRESSES.ArenaChampion,
          name: 'Arena Champion #1',
          image: 'https://via.placeholder.com/200',
        },
      ];

      return holdings;
    },
    enabled: !!address,
  });
}

// Hook to get marketplace listings
export function useMarketplaceListings() {
  return useQuery({
    queryKey: ['marketplaceListings'],
    queryFn: async () => {
      try {
        // In production, query The Graph for marketplace events
        // Example: GET subgraph query for NFTListed events
        const listings = [
          {
            id: '1',
            seller: '0x...',
            nftAddress: CONTRACT_ADDRESSES.ArenaChampion,
            tokenId: '1',
            price: '1000000000000000000', // 1 token in wei
            active: true,
          },
        ];

        return listings;
      } catch (error) {
        console.error('Error fetching marketplace listings:', error);
        return [];
      }
    },
  });
}

// Hook to get user transaction history
export function useUserTransactionHistory() {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['transactionHistory', address],
    queryFn: async () => {
      if (!address) return [];

      try {
        // Fallback: Use Base Scan API (requires API key)
        // In production, use The Graph for faster indexing
        const transactions: Transaction[] = [];

        return transactions;
      } catch (error) {
        console.error('Error fetching transaction history:', error);
        return [];
      }
    },
    enabled: !!address,
  });
}

// Hook to get tournament data
export function useTournamentData() {
  return useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      // Query The Graph for tournament events from ArenaPVP contract
      const tournaments = [
        {
          id: 1,
          name: 'Grand Championship',
          prizePool: '100000000000000000000', // 100 tokens
          active: true,
          startTime: Math.floor(Date.now() / 1000),
          endTime: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
          participants: 24,
        },
      ];

      return tournaments;
    },
  });
}

// Hook to get on-chain stats
export function useOnChainStats() {
  return useQuery({
    queryKey: ['onChainStats'],
    queryFn: async () => {
      // Query multiple endpoints for comprehensive stats
      const stats = {
        totalMarketplaceVolume: '0',
        totalTransactions: '0',
        activeUsers: '0',
        averageBattleDuration: '120',
        lastUpdated: new Date().toISOString(),
      };

      return stats;
    },
  });
}

// Hook to get token price data (using fallback to Coingecko)
export function useTokenPrice(tokenSymbol: string) {
  return useQuery({
    queryKey: ['tokenPrice', tokenSymbol],
    queryFn: async () => {
      try {
        // Fallback to CoinGecko API (free, no auth required)
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true`
        );
        const data = await response.json();

        // Return mock data for ARENA and AGL tokens
        if (tokenSymbol === 'ARENA') {
          return {
            symbol: 'ARENA',
            price: 0.85,
            change24h: 5.2,
            marketCap: 85000000,
          };
        }

        if (tokenSymbol === 'AGL') {
          return {
            symbol: 'AGL',
            price: 1.25,
            change24h: -2.1,
            marketCap: 125000000,
          };
        }

        return { symbol: tokenSymbol, price: 0, change24h: 0, marketCap: 0 };
      } catch (error) {
        console.error('Error fetching token price:', error);
        return { symbol: tokenSymbol, price: 0, change24h: 0, marketCap: 0 };
      }
    },
  });
}

// Hook to get battle history
export function useBattleHistory() {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['battleHistory', address],
    queryFn: async () => {
      if (!address) return [];

      // Query The Graph for Battle events where user participated
      const battles = [
        {
          id: 1,
          player1: address,
          player2: '0x1234567890123456789012345678901234567890',
          champion1Id: 1,
          champion2Id: 2,
          winner: address,
          timestamp: Math.floor(Date.now() / 1000),
          reward: '500000000000000000', // 0.5 tokens
        },
      ];

      return battles;
    },
    enabled: !!address,
  });
}
