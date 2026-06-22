'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { ERC20_ABI, ERC721_ABI, CONTRACT_ADDRESSES } from '@/lib/abis';

// Hook to get AGL token balance
export function useAGLBalance() {
  const { address } = useAccount();

  const { data: balance, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.AGLToken as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  const { data: decimals } = useReadContract({
    address: CONTRACT_ADDRESSES.AGLToken as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!address,
    },
  });

  return {
    balance: balance ? formatUnits(balance, decimals || 18) : '0',
    balanceRaw: balance || 0n,
    isLoading,
  };
}

// Hook to get ARENA token balance
export function useArenaTokenBalance() {
  const { address } = useAccount();

  const { data: balance, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.ArenaToken as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  const { data: decimals } = useReadContract({
    address: CONTRACT_ADDRESSES.ArenaToken as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!address,
    },
  });

  return {
    balance: balance ? formatUnits(balance, decimals || 18) : '0',
    balanceRaw: balance || 0n,
    isLoading,
  };
}

// Hook to get ArenaChampion NFT balance
export function useArenaChampionBalance() {
  const { address } = useAccount();

  const { data: balance, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.ArenaChampion as `0x${string}`,
    abi: ERC721_ABI,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  return {
    balance: balance ? Number(balance) : 0,
    isLoading,
  };
}

// Hook to get marketplace listings count
export function useMarketplaceListingsCount() {
  const { data: count, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.ArenaMarketplace as `0x${string}`,
    abi: [
      {
        inputs: [],
        name: 'listingsCount',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ] as const,
    functionName: 'listingsCount',
  });

  return {
    count: count ? Number(count) : 0,
    isLoading,
  };
}

// Hook to check if address is connected
export function useIsConnected() {
  const { address, isConnected } = useAccount();
  return { address, isConnected };
}
