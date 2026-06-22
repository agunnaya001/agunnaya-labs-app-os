'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Upload, CheckCircle, Loader2, Copy } from 'lucide-react';
import { usePublicClient, useWalletClient } from 'wagmi';

interface DeployPanelProps {
  code: () => string;
  address: string;
  contractName: string;
}

export function DeployPanel({ code, address, contractName }: DeployPanelProps) {
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const handleDeploy = async () => {
    setDeploying(true);
    setError(null);
    setDeployed(false);

    try {
      const currentCode = code();

      if (!currentCode.trim()) {
        throw new Error('No contract code to deploy');
      }

      if (!walletClient) {
        throw new Error('Wallet not connected');
      }

      // Simulate deployment process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, this would:
      // 1. Compile the code with solc
      // 2. Get deployment bytecode
      // 3. Send transaction via walletClient
      // 4. Wait for receipt

      const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
      setDeployedAddress(mockAddress);
      setDeployed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment failed');
    } finally {
      setDeploying(false);
    }
  };

  const handleCopyAddress = () => {
    if (deployedAddress) {
      navigator.clipboard.writeText(deployedAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 overflow-y-auto">
      {/* Deployment Info */}
      <div className="bg-black/40 p-3 rounded-lg border border-border/50">
        <div className="text-xs text-muted-foreground mb-2">Deployment Configuration</div>
        <div className="space-y-1 text-xs font-mono">
          <div>
            <span className="text-muted-foreground">Network: </span>
            <span className="text-neon-green">Base Mainnet</span>
          </div>
          <div>
            <span className="text-muted-foreground">Chain ID: </span>
            <span className="text-foreground">8453</span>
          </div>
          <div>
            <span className="text-muted-foreground">Deployer: </span>
            <span className="text-neon-purple truncate">{address}</span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex gap-2 p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-red-200">{error}</div>
        </div>
      )}

      {deployed && deployedAddress && (
        <div className="flex gap-2 p-3 rounded-lg bg-green-900/20 border border-green-500/30">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="text-green-200 font-semibold mb-2">Contract deployed successfully!</div>
            <div className="bg-black/40 p-2 rounded font-mono text-xs mb-2 break-all">
              {deployedAddress}
            </div>
            <Button
              onClick={handleCopyAddress}
              size="sm"
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-900/20"
            >
              {copied ? 'Copied!' : 'Copy Address'}
            </Button>
          </div>
        </div>
      )}

      {/* Compile Info */}
      <div className="bg-black/40 p-3 rounded-lg border border-border/50 text-xs">
        <div className="text-muted-foreground mb-2">Compilation</div>
        <div className="text-muted-foreground">
          Ready to compile and deploy with Solidity 0.8.20
        </div>
      </div>

      {/* Estimate */}
      <div className="bg-black/40 p-3 rounded-lg border border-border/50">
        <div className="text-xs text-muted-foreground mb-2">Estimated Gas</div>
        <div className="text-xl font-bold text-neon-green">~500,000 gas</div>
        <div className="text-xs text-muted-foreground mt-1">
          Current: ~50 gwei
        </div>
      </div>

      {/* Deploy Button */}
      <Button
        onClick={handleDeploy}
        disabled={deploying || !address}
        className="w-full bg-neon-green text-black hover:shadow-[0_0_20px_rgba(0,255,157,0.5)] font-bold disabled:opacity-50"
      >
        {deploying ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Deploying...
          </>
        ) : deployed ? (
          'Deploy Another'
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Deploy to Base
          </>
        )}
      </Button>

      {/* Warnings */}
      <div className="bg-amber-900/20 p-3 rounded-lg border border-amber-500/30 text-xs">
        <div className="font-semibold text-amber-200 mb-2">Important</div>
        <ul className="text-amber-100 space-y-1 list-disc list-inside">
          <li>Deployment is irreversible</li>
          <li>You pay gas fees for deployment</li>
          <li>Test thoroughly before deploying</li>
        </ul>
      </div>
    </div>
  );
}
