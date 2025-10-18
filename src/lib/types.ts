import { PublicKey } from '@solana/web3.js'

// Types from MultiVault IDL
export interface MultiVault {
  authority: PublicKey
  totalAssets: number
  totalValue: number
  feeBps: number
  bump: number
  name: number[] // [u8; 64]
}

export interface VaultAsset {
  vault: PublicKey
  assetMint: PublicKey
  sharesMint: PublicKey
  totalShares: number
  totalStaked: number
  currentPrice: number
  basePrice: number
  bump: number
  name: number[] // [u8; 64]
}

// Legacy Asset interface for backward compatibility
export interface Asset {
  authority: PublicKey
  assetMint: PublicKey
  sharesMint: PublicKey
  usdcMint: PublicKey
  vault: PublicKey
  stakingVault: PublicKey
  totalStaked: number
  rewardPerShareAcc: number
  currentDailyPriceUsd: number
  baseDailyPriceUsd: number
  feeBps: number
  priceUpdater: PublicKey
  bump: number
  name: number[] // [u8; 64]
}

export interface UserPosition {
  initialized: number
  owner: PublicKey
  asset: PublicKey
  sharesStaked: number
  rewardDebt: number
  accruedRewards: number
}

// MultiVault Events
export interface MultiVaultInitializedEvent {
  vault: PublicKey
  authority: PublicKey
  feeBps: number
  name: string
}

export interface AssetAddedToVaultEvent {
  vault: PublicKey
  asset: PublicKey
  assetMint: PublicKey
  sharesMint: PublicKey
  totalShares: number
  basePrice: number
}

// Legacy Events
export interface AssetInitializedEvent {
  asset: PublicKey
  authority: PublicKey
  sharesMint: PublicKey
  usdcMint: PublicKey
  feeBps: number
  baseDailyPriceUsd: number
}

export interface StakedEvent {
  asset: PublicKey
  user: PublicKey
  amount: number
}

export interface UnstakedEvent {
  asset: PublicKey
  user: PublicKey
  amount: number
}

export interface RentedEvent {
  asset: PublicKey
  renter: PublicKey
  days: number
  grossUsdc6: number
  feeUsdc6: number
}

export interface ClaimedEvent {
  asset: PublicKey
  user: PublicKey
  amount: number
}

export interface PriceUpdatedEvent {
  asset: PublicKey
  dailyPriceUsd: number
}

// MultiVault Program errors
export enum MultiVaultErr {
  Unauthorized = 6000,
  VaultNotFound = 6001,
  AssetNotFound = 6002,
  InsufficientShares = 6003,
  InvalidInput = 6004,
  VaultFull = 6005,
  AssetAlreadyExists = 6006,
  InsufficientFunds = 6007,
  InvalidVaultAuthority = 6008,
  Overflow = 6009,
}

// Legacy errors
export enum LuxErr {
  Unauthorized = 6000,
  NothingToClaim = 6001,
  InsufficientStake = 6002,
  InvalidInput = 6003,
  InvalidVault = 6004,
  InvalidMintAuthority = 6005,
  Overflow = 6006,
}

// Helper types for UI
export interface AssetData {
  id: string
  name: string
  type: 'yacht' | 'jet' | 'car'
  description: string
  image: string
  location: string
  price: number
  currency: 'SOL' | 'USDC'
  totalShares: number
  availableShares: number
  nextAvailable: string
  ownerId: string
  status: 'active' | 'pending' | 'inactive'
  createdAt: string
  // Blockchain data
  assetPDA?: PublicKey
  sharesMint?: PublicKey
  currentPrice?: number
  totalStaked?: number
}

export interface UserPositionData {
  asset: PublicKey
  sharesStaked: number
  accruedRewards: number
  pendingRewards: number
  assetData?: AssetData
}

export interface WalletBalance {
  sol: number
  usdc: number
}

export interface WalletState {
  connected: boolean
  connecting: boolean
  publicKey?: PublicKey
  balance?: WalletBalance
  walletName?: string
}
