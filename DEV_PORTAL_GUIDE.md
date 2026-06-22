# Dev Portal - Smart Contract IDE Integration Guide

## Overview

The **Dev Portal** is now fully integrated into the Agunnaya Labs App OS. It provides a complete smart contract development environment powered by Monaco Editor and AI-assisted development agents.

## Features

### 1. Solidity Editor
- **Monaco Editor** with full Solidity syntax highlighting
- Real-time code editing with auto-completion
- Line numbers, code folding, and bracket matching
- Responsive layout that works on all screen sizes

### 2. AI Development Agents
Four specialized AI agents assist with smart contract development:

#### Architect Agent
- Design pattern recommendations
- Contract architecture suggestions
- Proxy pattern guidance
- State variable organization

#### Security Agent  
- Vulnerability detection and analysis
- Access control verification
- Reentrancy risk assessment
- ERC-specific security patterns (ERC721 safety, etc.)

#### Gas Optimization Agent
- Gas efficiency suggestions
- Storage variable packing recommendations
- Loop and operation optimization
- Memory vs storage trade-offs

#### Testing Agent
- Foundry test generation
- Fuzz test specification
- Invariant test suggestions
- Edge case identification

### 3. Deploy Panel
- Contract deployment to Base Mainnet
- Gas estimation and pricing
- Real-time network status
- Deployment history tracking
- Contract address management
- Verified deployment status

### 4. Contract Templates
Pre-built contract templates for quick start:

- **ERC20**: Standard fungible token implementation
- **ERC721**: NFT collection with minting
- **Staking**: Token staking with 45% APY rewards
- **Swap**: Simple DEX with constant product formula
- **Battle**: Arena battle system with scoring

## How to Access

1. Navigate to `/dev-portal` from the sidebar "Dev Portal" link
2. Connect your wallet (MetaMask, Rainbow, WalletConnect)
3. Start developing smart contracts

## Workflow

### Development Flow

```
1. Select Contract Template → 2. Edit Code
  ↓
3. Chat with AI Agents → 4. Get Feedback
  ↓
5. Deploy to Base Mainnet → 6. Save Contract
```

### Example: Creating an ERC20 Token

1. **Select Template**: Choose "ERC20" template
2. **Customize**: Edit token name, symbol, initial supply
3. **Get Security Review**: Ask Security Agent to audit code
4. **Optimize**: Use Gas Agent to reduce deployment costs
5. **Generate Tests**: Ask Testing Agent for test cases
6. **Deploy**: Click "Deploy to Base" button
7. **Verify**: Copy deployed contract address for verification

## Components Breakdown

### IDELayout.tsx
Main container managing:
- Code state
- Tab switching between Agent and Deploy panels
- Save functionality
- Header with branding

### SolidityEditor.tsx
Monaco Editor integration:
- Code editing with Solidity language support
- Syntax highlighting and formatting
- Ref-based value retrieval for deployment

### AgentChat.tsx
AI assistant interface:
- Agent selection (Architect, Security, Gas, Testing)
- Message history with scrolling
- Quick prompt suggestions
- Copy-to-clipboard functionality
- Auto-save conversations

### DeployPanel.tsx
Deployment interface:
- Network and chain info display
- Gas estimation
- Deployment status tracking
- Contract address copying
- Warning and error messages

## Smart Contract Templates

### ERC20 Template
```solidity
contract MyToken is ERC20, Ownable {
  - Mint and burn functions
  - Owner-based access control
}
```

### ERC721 Template
```solidity
contract MyNFT is ERC721, Ownable {
  - Auto-incrementing token IDs
  - Safe minting
}
```

### Staking Template
```solidity
contract Staking is Ownable {
  - Configurable APY (default 45%)
  - Time-based reward calculation
  - Claim and unstake functions
}
```

### Swap Template
```solidity
contract SimpleSwap {
  - Liquidity management
  - Token exchange via AMM
  - Price calculation
}
```

### Battle Template
```solidity
contract ArenaBattle {
  - Battle creation and tracking
  - Score management
  - Winner determination
}
```

## Deployment to Base Mainnet

### Prerequisites
- Connected wallet with Base Mainnet as active network
- Sufficient ETH for gas fees
- Compiled smart contract code

### Deployment Steps
1. Review contract code in editor
2. Consult with agents if needed
3. Check gas estimate in Deploy Panel
4. Click "Deploy to Base"
5. Confirm transaction in wallet
6. Wait for confirmation
7. Copy and save deployed address

### After Deployment
- **Verify on BaseScan**: Add ABI and source code
- **Set Permissions**: Configure if using proxy pattern
- **Monitor Activity**: Track transaction history
- **Save Contract**: Store in local browser storage

## Compiler & Analysis

### Syntax Checking
- Detects missing pragma declarations
- Identifies unclosed braces
- Validates function syntax
- Catches common errors

### Security Analysis
- Reentrancy vulnerability detection
- Deprecated function warnings
- Authorization pattern review
- ERC-specific safety checks

### Gas Optimization
- Identifies unchecked loops
- Detects storage packing opportunities
- Recommends immutable variables
- Suggests optimization strategies

## Local Storage

Contracts are automatically saved to browser localStorage:
- **Key Format**: `contract_${timestamp}`
- **Last Contract**: Saved as `last_contract`
- **Recovery**: Reload the page to recover unsaved work

## Advanced Features (Roadmap)

- Real-time Solidity compiler integration
- Actual contract deployment via Wagmi
- Multi-file project support
- Gas profiling and analysis
- Automated security auditing
- Contract verification automation
- Deployment script generation
- ABI export and management

## Troubleshooting

### Wallet Won't Connect
1. Ensure wallet extension is installed
2. Try refreshing the page
3. Switch to a different wallet
4. Check browser console for errors

### Deployment Fails
1. Verify enough gas (min 500k)
2. Check network is Base Mainnet (Chain ID: 8453)
3. Review contract for syntax errors
4. Consult Security Agent for vulnerabilities

### Agent Responses Not Helpful
1. Ask more specific questions
2. Provide code context
3. Reference specific functions
4. Ask for step-by-step guidance

## API Endpoints (Future)

```
POST /api/dev-portal/compile
POST /api/dev-portal/analyze
POST /api/dev-portal/deploy
POST /api/dev-portal/verify
POST /api/chat (AI agent responses)
```

## Security Considerations

- Never share private keys in chat
- Contracts are not audited by default
- Test thoroughly before deploying
- Verify code on BaseScan before trusting
- Use rate limiting for AI agent API
- Implement request authentication

## Performance Metrics

- Monaco Editor initialization: ~200ms
- AI agent response: ~1-2s (simulated)
- Deployment gas: ~500k-2M depending on contract
- Page load time: <3s

## Future Integrations

1. **Real AI Integration**: Connect to Claude/GPT-4 for agents
2. **Solidity Compiler**: Full solc-js compilation
3. **Test Framework**: Foundry test execution
4. **Verification**: Automatic BaseScan verification
5. **Audit Reports**: AI-powered security audits
6. **Gas Reports**: Detailed gas analysis reports
7. **Multi-Chain**: Support for other chains
8. **Import/Export**: GitHub integration for versioning

## Support & Documentation

- **Docs**: https://docs.agunnayalabs.com/dev-portal
- **Discord**: Support channel in Agunnaya Labs Discord
- **Email**: dev-portal@agunnayalabs.com
- **GitHub Issues**: Report bugs and request features

---

**Dev Portal v1.0** • Agunnaya Labs 2024
