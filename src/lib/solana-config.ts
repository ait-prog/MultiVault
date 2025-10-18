import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

// Program ID for MultiVault (update this with the new MultiVault program ID)
export const PROGRAM_ID = new PublicKey('EF9CQ7WfxzUmTpmQxhMv9WFCJoLkyTKniXdDYXaUg5Kh')

// Network configuration
export const NETWORK_CONFIG = {
  // Localnet (for development with local validator)
  localnet: 'http://127.0.0.1:8899',
  
  // Devnet (for testing)
  devnet: clusterApiUrl('devnet'),
  
  // Mainnet (for production)
  mainnet: clusterApiUrl('mainnet-beta'),
}

// Current network (can be switched)
export const CURRENT_NETWORK = 'localnet' as keyof typeof NETWORK_CONFIG

// RPC connection
export const connection = new Connection(
  NETWORK_CONFIG[CURRENT_NETWORK],
  'confirmed'
)

// USDC mint address (for devnet/localnet)
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

// Configuration for Anchor
export const anchorConfig = {
  programId: PROGRAM_ID,
  connection,
  network: CURRENT_NETWORK,
  commitment: 'confirmed' as const,
}

// MultiVault Helper functions
export const getMultiVaultPDA = (authority: PublicKey, vaultName: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('multivault'), authority.toBuffer(), Buffer.from(vaultName)],
    PROGRAM_ID
  )
}

export const getVaultAssetPDA = (vault: PublicKey, assetMint: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('vault_asset'), vault.toBuffer(), assetMint.toBuffer()],
    PROGRAM_ID
  )
}

export const getUserVaultPositionPDA = (vault: PublicKey, user: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('user_position'), vault.toBuffer(), user.toBuffer()],
    PROGRAM_ID
  )
}

// Legacy helper functions
export const getAssetPDA = (assetMint: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('asset'), assetMint.toBuffer()],
    PROGRAM_ID
  )
}

export const getUserPositionPDA = (asset: PublicKey, user: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('pos'), asset.toBuffer(), user.toBuffer()],
    PROGRAM_ID
  )
}

// Constants
export const LAMPORTS_PER_SOL = 1_000_000_000
export const USDC_DECIMALS = 6
export const SCALE = 1_000_000_000_000 // 1e12 for high precision RPS
