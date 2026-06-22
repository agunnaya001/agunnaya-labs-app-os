# Agunnaya Labs - Production Deployment

## Live Application

**Production URL**: https://app.agunnayalabs.xyz  
**Vercel URL**: https://agunnaya-labs-app-kj2ebel6n-chonk9000.vercel.app  
**Deployment Status**: ✅ Active and Live  
**Build Status**: ✅ Successful (20 seconds)  

## Deployment Info

- **Platform**: Vercel (Hobby Plan compatible)
- **Framework**: Next.js 16.2.6 with Turbopack
- **Build Time**: 9.8 seconds
- **Deploy Time**: 36 seconds total
- **Bundle Size**: Optimized with automatic tree-shaking

## Environment Variables Required

Set these in your Vercel project settings under "Environment Variables":

```env
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your_project_id>
```

## Features Live in Production

### Dashboard
- Real wallet connection (MetaMask, Rainbow, WalletConnect)
- Live AGL token balance display
- Real NFT champion counts from ArenaChampion contract
- Marketplace listings from ArenaMarketplace

### Arena
- Tournament listings
- Live battle system
- Player rankings

### DeFi Hub
- Token swap interface
- Staking dashboard (45% APY)
- Liquidity indicators

### Marketplace
- NFT trading interface
- Rarity classification
- Buy/Sell modals

### Dev Portal
- Smart Contract IDE with Monaco editor
- 4 AI development agents
- 5 contract templates
- Deploy to Base Mainnet
- Gas estimation

### Analytics
- On-chain metrics
- Player leaderboards
- Volume tracking

## Base Mainnet Smart Contracts

All contracts deployed on Base Mainnet (Chain ID: 8453):

| Contract | Address |
|----------|---------|
| ArenaMarketplace | 0x67817157Dd6E5945ac2fAf1a822e7f1dE26C698E |
| ArenaToken | 0x3b855F88CB93aA642EaEB13F59987C552Fc614b5 |
| ArenaChampion | 0x68f08b005b09B0F7D07E1c0B5CDe18E43CE2486A |
| ArenaBattle | 0xF6fc2B6a306B626548ca9dF25B31a22D0f8971CF |
| ArenaPVP | 0xd0C4Af12E95f9590e7314D079C58597771E57533 |
| AGL Token | 0xEA1221B4d80A89BD8C75248Fae7c176BD1854698 |

## Performance Metrics

- **Build**: 20 seconds (optimized)
- **Deploy**: 36 seconds total
- **Pages Prerendered**: 4 static routes
- **JavaScript Optimizations**: Automatic code splitting

## Testing the Deployment

1. Visit https://app.agunnayalabs.xyz
2. Connect your wallet (Base Mainnet required)
3. View real token balances and NFT counts
4. Navigate to Dev Portal at /dev-portal
5. Write and deploy a Solidity contract

## Monitoring

Monitor deployment at: https://vercel.com/agunnaya001/agunnaya-labs-app-os

## Rollback Instructions

To rollback to previous deployment:
```bash
vercel --prod --previous
```

## Next Steps

1. Add WalletConnect Project ID to environment variables
2. Configure custom domain (already using app.agunnayalabs.xyz)
3. Set up monitoring and analytics
4. Configure Sentry for error tracking
5. Enable automated SSL certificates

## Support

For deployment issues, check:
- Vercel dashboard logs
- Environment variables configuration
- Base Mainnet RPC connectivity
- WalletConnect configuration

---

**Deployed on**: June 22, 2026 14:23 UTC  
**Status**: Production Ready
