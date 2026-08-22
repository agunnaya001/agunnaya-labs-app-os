'use client'

import * as React from "react"
import { ReactNode } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, publicClient } = configureChains([base, mainnet], [publicProvider()])
const { connectors } = getDefaultWallets({ appName: 'Agunnaya Labs', chains })
const wagmiConfig = createConfig({ autoConnect: true, connectors, publicClient })

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}
