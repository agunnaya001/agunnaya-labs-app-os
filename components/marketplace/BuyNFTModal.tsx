'use client';

import { useState } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { TransactionStatus } from '@/components/ui/LoadingState';

interface BuyNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    id: string;
    name: string;
    image?: string;
    price: string;
    seller: string;
  };
}

export function BuyNFTModal({ isOpen, onClose, nft }: BuyNFTModalProps) {
  const { isConnected } = useAccount();
  const [step, setStep] = useState<'confirm' | 'processing' | 'success' | 'error'>('confirm');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      setStep('error');
      return;
    }

    setStep('processing');
    setError(null);

    try {
      // Simulate transaction
      // In real implementation, this would call useMarketplaceTransaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTxHash('0x' + Math.random().toString(16).slice(2));
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      setStep('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Purchase NFT</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'confirm' && (
          <>
            {nft.image && (
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item</span>
                <span className="font-semibold">{nft.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold text-neon-green">{nft.price} ARENA</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-neon-green">{nft.price} ARENA</span>
              </div>
            </div>

            <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-3 mb-6 text-sm">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-neon-purple flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground">
                  You will need to approve token spending before purchasing.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleBuy}
                className="flex-1 bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]"
              >
                Confirm Purchase
              </Button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="space-y-6">
            <TransactionStatus
              isLoading={true}
              isSuccess={false}
              hash={txHash || undefined}
            />
            <p className="text-sm text-muted-foreground text-center">
              Please confirm the transaction in your wallet...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-12 h-12 text-neon-green" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Purchase Successful!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You now own {nft.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Transaction: <code className="text-neon-green">{txHash?.slice(0, 10)}...</code>
              </p>
            </div>
            <Button
              onClick={onClose}
              className="w-full bg-neon-green text-black font-bold"
            >
              Done
            </Button>
          </div>
        )}

        {step === 'error' && (
          <div className="space-y-6">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Transaction Failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setStep('confirm')}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 bg-neon-green text-black font-bold"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
