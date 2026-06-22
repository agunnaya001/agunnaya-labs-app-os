'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { IDELayout } from '@/components/dev-portal/IDELayout';
import { ConnectWallet } from '@/components/web3/ConnectWallet';
import { Code2, Wallet, AlertCircle } from 'lucide-react';

export default function DevPortalPage() {
  const { isConnected, address } = useAccount();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('erc20');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="glass p-12 rounded-xl text-center max-w-md animate-pulse">
            <div className="h-16 w-16 bg-black/40 rounded-full mx-auto mb-6" />
            <div className="h-8 bg-black/40 rounded w-3/4 mx-auto mb-4" />
            <div className="h-4 bg-black/40 rounded w-full mb-2" />
            <div className="h-4 bg-black/40 rounded w-5/6 mx-auto" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!isConnected) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="glass p-12 rounded-xl text-center max-w-md">
            <div className="flex justify-center mb-6">
              <Code2 className="w-16 h-16 text-neon-green glow-green" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Dev Portal</h1>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to start developing, testing, and deploying smart contracts directly to Base Mainnet.
            </p>
            <div className="mb-6">
              <ConnectWallet />
            </div>
            <div className="flex items-start gap-3 bg-black/40 p-4 rounded-lg text-left text-sm text-muted-foreground">
              <AlertCircle className="w-5 h-5 text-neon-purple flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">Base Mainnet Only</p>
                <p>Contracts deployed from this portal will be deployed to Base Mainnet.</p>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 overflow-hidden">
        <IDELayout address={address || ''} selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />
      </div>
    </AppLayout>
  );
}
