'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

interface UseContractActionProps {
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
}

export function useContractAction({ onSuccess, onError }: UseContractActionProps = {}) {
  const { writeContract, isPending: isWriting, data: hash } = useWriteContract();
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [error, setError] = useState<string | null>(null);

  const executeTransaction = async ({
    address,
    abi,
    functionName,
    args,
  }: {
    address: `0x${string}`;
    abi: any;
    functionName: string;
    args: any[];
  }) => {
    try {
      setError(null);
      writeContract(
        {
          address,
          abi,
          functionName,
          args,
        },
        {
          onSuccess: (hash) => {
            onSuccess?.(hash);
          },
          onError: (error) => {
            setError(error.message);
            onError?.(error as Error);
          },
        }
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      onError?.(error);
    }
  };

  return {
    executeTransaction,
    isLoading: isWriting || isWaiting,
    isSuccess,
    hash,
    error,
  };
}

// Hook to approve token spending
export function useTokenApproval({
  tokenAddress,
  spenderAddress,
  amount,
  onSuccess,
}: {
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
  amount: bigint;
  onSuccess?: (hash: string) => void;
}) {
  const { executeTransaction, ...rest } = useContractAction({ onSuccess });

  const approve = async () => {
    executeTransaction({
      address: tokenAddress,
      abi: [
        {
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [{ name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'approve',
      args: [spenderAddress, amount],
    });
  };

  return { approve, ...rest };
}

// Hook for marketplace buy/sell
export function useMarketplaceTransaction({
  marketplaceAddress,
  onSuccess,
}: {
  marketplaceAddress: `0x${string}`;
  onSuccess?: (hash: string) => void;
}) {
  const { executeTransaction, ...rest } = useContractAction({ onSuccess });

  const buyNFT = async (listingId: bigint) => {
    executeTransaction({
      address: marketplaceAddress,
      abi: [
        {
          inputs: [{ name: '_listingId', type: 'uint256' }],
          name: 'buyNFT',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ] as const,
      functionName: 'buyNFT',
      args: [listingId],
    });
  };

  const listNFT = async (nftAddress: `0x${string}`, tokenId: bigint, price: bigint) => {
    executeTransaction({
      address: marketplaceAddress,
      abi: [
        {
          inputs: [
            { name: '_nftAddress', type: 'address' },
            { name: '_tokenId', type: 'uint256' },
            { name: '_price', type: 'uint256' },
          ],
          name: 'listNFT',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'listNFT',
      args: [nftAddress, tokenId, price],
    });
  };

  return { buyNFT, listNFT, ...rest };
}
