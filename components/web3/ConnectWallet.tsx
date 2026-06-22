'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!ready) {
          return null;
        }

        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="px-4 py-2 rounded-lg bg-neon-green text-primary-foreground font-semibold hover:shadow-[0_0_30px_rgba(0,255,157,0.8)] transition-all duration-200"
            >
              Connect Wallet
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="px-4 py-2 rounded-lg bg-destructive text-white font-semibold"
            >
              Wrong Network
            </button>
          );
        }

        return (
          <div className="flex gap-2">
            <button
              onClick={openChainModal}
              className="px-3 py-2 rounded-lg bg-neon-purple text-secondary-foreground font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all"
            >
              {chain.name}
            </button>
            <button
              onClick={openAccountModal}
              className="px-3 py-2 rounded-lg bg-neon-green text-primary-foreground font-semibold hover:shadow-[0_0_20px_rgba(0,255,157,0.6)] transition-all"
            >
              {account.displayName}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
