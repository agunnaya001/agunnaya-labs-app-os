// ERC20 ABI (for AGL Token and other ERC20 tokens)
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
] as const;

// ERC721 ABI (for ArenaChampion NFTs)
export const ERC721_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', type: 'address' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// ArenaMarketplace ABI
export const ARENA_MARKETPLACE_ABI = [
  {
    inputs: [],
    name: 'listingsCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'uint256' }],
    name: 'listings',
    outputs: [
      { name: 'seller', type: 'address' },
      { name: 'nftAddress', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'price', type: 'uint256' },
      { name: 'active', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
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
  {
    inputs: [{ name: '_listingId', type: 'uint256' }],
    name: 'buyNFT',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: '_listingId', type: 'uint256' }],
    name: 'cancelListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// ArenaToken ABI
export const ARENA_TOKEN_ABI = ERC20_ABI;

// ArenaChampion ABI
export const ARENA_CHAMPION_ABI = ERC721_ABI;

// ArenaBattle ABI
export const ARENA_BATTLE_ABI = [
  {
    inputs: [],
    name: 'battlesCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'uint256' }],
    name: 'battles',
    outputs: [
      { name: 'player1', type: 'address' },
      { name: 'player2', type: 'address' },
      { name: 'champion1Id', type: 'uint256' },
      { name: 'champion2Id', type: 'uint256' },
      { name: 'winner', type: 'address' },
      { name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_challengerAddress', type: 'address' },
      { name: '_championId', type: 'uint256' },
    ],
    name: 'initiateBattle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_battleId', type: 'uint256' },
      { name: '_winnerIndex', type: 'uint8' },
    ],
    name: 'resolveBattle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// ArenaPVP ABI
export const ARENA_PVP_ABI = [
  {
    inputs: [],
    name: 'tournamentCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'uint256' }],
    name: 'tournaments',
    outputs: [
      { name: 'name', type: 'string' },
      { name: 'prizePool', type: 'uint256' },
      { name: 'active', type: 'bool' },
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_tournamentId', type: 'uint256' }],
    name: 'getParticipants',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_tournamentId', type: 'uint256' }],
    name: 'joinTournament',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// AGL Token ABI
export const AGL_TOKEN_ABI = ERC20_ABI;

export const CONTRACT_ADDRESSES = {
  ArenaMarketplace: '0x67817157Dd6E5945ac2fAf1a822e7f1dE26C698E',
  ArenaToken: '0x3b855F88CB93aA642EaEB13F59987C552Fc614b5',
  ArenaChampion: '0x68f08b005b09B0F7D07E1c0B5CDe18E43CE2486A',
  ArenaBattle: '0xF6fc2B6a306B626548ca9dF25B31a22D0f8971CF',
  ArenaPVP: '0xd0C4Af12E95f9590e7314D079C58597771E57533',
  AGLToken: '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698',
} as const;
