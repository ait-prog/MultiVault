"use client"

import { useState, useCallback } from "react"
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'
import { useWallet } from "./wallet-context"
import { getProgram, createProgram } from "./program"
import { getAssetPDA, getUserPositionPDA, getMultiVaultPDA, getVaultAssetPDA, getUserVaultPositionPDA, USDC_MINT } from "./solana-config"
import { AssetData, UserPositionData } from "./types"
import { 
  createMint, 
  createAssociatedTokenAccount, 
  getAssociatedTokenAddress,
  mintTo,
  transfer,
  getAccount
} from '@solana/spl-token'

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
}

export interface SPLTokenInfo {
  mint: string
  symbol: string
  decimals: number
  totalSupply: number
  authority: string
}

// Hook for Asset operations
export function useAssetOperations() {
  const { wallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const createAsset = useCallback(
    async (assetData: {
      name: string
      baseDailyPriceUsd: number
      feeBps: number
    }): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any) // Cast to Wallet type
        
        // Create NFT mint for asset
        const assetMint = await createMint(
          program.provider.connection,
          wallet as any,
          wallet.publicKey,
          wallet.publicKey,
          0 // 0 decimals for NFT
        )

        // Create shares mint
        const sharesMint = await createMint(
          program.provider.connection,
          wallet as any,
          wallet.publicKey,
          wallet.publicKey,
          0 // 0 decimals for whole shares
        )

        // Get PDA for asset
        const [assetPDA] = getAssetPDA(assetMint)

        // Create ATA for vault and staking vault
        const vault = await getAssociatedTokenAddress(USDC_MINT, assetPDA, true)
        const stakingVault = await getAssociatedTokenAddress(sharesMint, assetPDA, true)

        // Initialize asset
        const tx = await program.methods
          .initAsset(
            assetData.name,
            new BN(assetData.baseDailyPriceUsd),
            assetData.feeBps
          )
          .accounts({
            authority: wallet.publicKey,
            assetMint,
            sharesMint,
            usdcMint: USDC_MINT,
            asset: assetPDA,
            vault,
            stakingVault,
            tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        return assetPDA.toString()
      } finally {
        setIsLoading(false)
      }
    },
    [wallet.connected, wallet.publicKey],
  )

  return {
    createAsset,
    isLoading,
  }
}

// Hook for Staking operations
export function useStakingOperations() {
  const { wallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const stake = useCallback(
    async (assetPDA: PublicKey, amount: number): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get asset account
        const asset = await program.account.asset.fetch(assetPDA)
        
        // Get user ATA for shares
        const userSharesAta = await getAssociatedTokenAddress(
          asset.sharesMint,
          wallet.publicKey
        )

        // Get PDA for user position
        const [userPositionPDA] = getUserPositionPDA(assetPDA, wallet.publicKey)

        // Create ATA if not exists
        try {
          await getAccount(program.provider.connection, userSharesAta)
        } catch {
          await createAssociatedTokenAccount(
            program.provider.connection,
            wallet as any,
            asset.sharesMint,
            wallet.publicKey
          )
        }

        // Perform staking
        const tx = await program.methods
          .stake(new BN(amount))
          .accounts({
            user: wallet.publicKey,
            asset: assetPDA,
            sharesMint: asset.sharesMint,
            usdcMint: asset.usdcMint,
            userSharesAta,
            stakingVault: asset.stakingVault,
            userPosition: userPositionPDA,
            tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        return tx
      } finally {
        setIsLoading(false)
      }
    },
    [wallet.connected, wallet.publicKey],
  )

  const unstake = useCallback(
    async (assetPDA: PublicKey, amount: number): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get asset account
        const asset = await program.account.asset.fetch(assetPDA)
        
        // Get user ATA for shares
        const userSharesAta = await getAssociatedTokenAddress(
          asset.sharesMint,
          wallet.publicKey
        )

        // Get PDA for user position
        const [userPositionPDA] = getUserPositionPDA(assetPDA, wallet.publicKey)

        // Perform unstaking
        const tx = await program.methods
          .unstake(new BN(amount))
          .accounts({
            user: wallet.publicKey,
            asset: assetPDA,
            stakingVault: asset.stakingVault,
            userSharesAta,
            userPosition: userPositionPDA,
            tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
          })
          .rpc()

        return tx
      } finally {
        setIsLoading(false)
      }
    },
    [wallet.connected, wallet.publicKey],
  )

  const claim = useCallback(
    async (assetPDA: PublicKey): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get asset account
        const asset = await program.account.asset.fetch(assetPDA)
        
        // Get user ATA for USDC
        const userUsdcAta = await getAssociatedTokenAddress(
          asset.usdcMint,
          wallet.publicKey
        )

        // Get PDA for user position
        const [userPositionPDA] = getUserPositionPDA(assetPDA, wallet.publicKey)

        // Create ATA if not exists
        try {
          await getAccount(program.provider.connection, userUsdcAta)
        } catch {
          await createAssociatedTokenAccount(
            program.provider.connection,
            wallet as any,
            asset.usdcMint,
            wallet.publicKey
          )
        }

        // Perform claim
        const tx = await program.methods
          .claim()
          .accounts({
            user: wallet.publicKey,
            asset: assetPDA,
            vault: asset.vault,
            userUsdcAta,
            userPosition: userPositionPDA,
            tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
          })
          .rpc()

        return tx
      } finally {
        setIsLoading(false)
      }
    },
    [wallet.connected, wallet.publicKey],
  )

  return {
    stake,
    unstake,
    claim,
    isLoading,
  }
}

// Hook for Rental operations
export function useRentalOperations() {
  const { wallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const rentAsset = useCallback(
    async (assetPDA: PublicKey, days: number): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get asset account
        const asset = await program.account.asset.fetch(assetPDA)
        
        // Get user ATA for USDC
        const renterUsdcAta = await getAssociatedTokenAddress(
          asset.usdcMint,
          wallet.publicKey
        )

        // Get ATA for protocol fees (can use any USDC account)
        const protocolFeeAta = await getAssociatedTokenAddress(
          asset.usdcMint,
          wallet.publicKey // In real app this should be protocol address
        )

        // Create ATA if not exists
        try {
          await getAccount(program.provider.connection, renterUsdcAta)
        } catch {
          await createAssociatedTokenAccount(
            program.provider.connection,
            wallet as any,
            asset.usdcMint,
            wallet.publicKey
          )
        }

        // Perform rental
        const tx = await program.methods
          .rent(days)
          .accounts({
            renter: wallet.publicKey,
            asset: assetPDA,
            vault: asset.vault,
            renterUsdcAta,
            protocolFeeAta,
            tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
          })
          .rpc()

        return tx
      } finally {
        setIsLoading(false)
      }
    },
    [wallet.connected, wallet.publicKey],
  )

  return {
    rentAsset,
    isLoading,
  }
}

// Hook for Asset management operations
export function useAssetManagementOperations() {
  const { wallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const mintShares = useCallback(
    async (assetPDA: PublicKey, amount: number, to: PublicKey): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get asset account
        const asset = await program.account.asset.fetch(assetPDA)
        
        // Get recipient ATA for shares
        const toSharesAta = await getAssociatedTokenAddress(
          asset.sharesMint,
          to
        )

        // Create ATA if not exists
        try {
          await getAccount(program.provider.connection, toSharesAta)
        } catch {
          await createAssociatedTokenAccount(
            program.provider.connection,
            wallet as any,
            asset.sharesMint,
            to
          )
        }

        // Mint shares
        const tx = await program.methods
          .mintShares(new BN(amount))
          .accounts({
            authority: wallet.publicKey,
            asset: assetPDA,
            sharesMint: asset.sharesMint,
            toSharesAta,
            tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
          })
          .rpc()

        return tx
      } finally {
          setIsLoading(false)
        }
    },
    [wallet.connected, wallet.publicKey],
  )

  const updatePrice = useCallback(
    async (assetPDA: PublicKey, newPrice: number): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)

        // Update price
        const tx = await program.methods
          .updatePrice(new BN(newPrice))
          .accounts({
            caller: wallet.publicKey,
            asset: assetPDA,
          })
          .rpc()

        return tx
      } finally {
        setIsLoading(false)
      }
    },
    [wallet.connected, wallet.publicKey],
  )

  return {
    mintShares,
    updatePrice,
    isLoading,
  }
}

// MultiVault Hooks
export function useMultiVaultOperations() {
  const { wallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const createMultiVault = useCallback(
    async (vaultData: {
      name: string
      feeBps: number
    }): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get MultiVault PDA
        const [vaultPDA] = getMultiVaultPDA(wallet.publicKey, vaultData.name)

        // Initialize MultiVault
        const tx = await program.methods
          .initMultiVault(
            vaultData.name,
            vaultData.feeBps
          )
          .accounts({
            authority: wallet.publicKey,
            vault: vaultPDA,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        return tx
      } catch (error) {
        console.error('Failed to create MultiVault:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [wallet]
  )

  const addAssetToVault = useCallback(
    async (vaultName: string, assetData: {
      name: string
      assetMint: PublicKey
      sharesMint: PublicKey
      totalShares: number
      basePrice: number
    }): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get vault and asset PDAs
        const [vaultPDA] = getMultiVaultPDA(wallet.publicKey, vaultName)
        const [vaultAssetPDA] = getVaultAssetPDA(vaultPDA, assetData.assetMint)

        // Add asset to vault
        const tx = await program.methods
          .addAssetToVault(
            assetData.name,
            assetData.totalShares,
            new BN(assetData.basePrice)
          )
          .accounts({
            authority: wallet.publicKey,
            vault: vaultPDA,
            asset: vaultAssetPDA,
            assetMint: assetData.assetMint,
            sharesMint: assetData.sharesMint,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        return tx
      } catch (error) {
        console.error('Failed to add asset to vault:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [wallet]
  )

  const stakeInVault = useCallback(
    async (vaultName: string, assetMint: PublicKey, amount: number): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get PDAs
        const [vaultPDA] = getMultiVaultPDA(wallet.publicKey, vaultName)
        const [vaultAssetPDA] = getVaultAssetPDA(vaultPDA, assetMint)
        const [userPositionPDA] = getUserVaultPositionPDA(vaultPDA, wallet.publicKey)

        // Get user ATA for shares
        const userSharesATA = await getAssociatedTokenAddress(
          assetMint, // This should be the shares mint
          wallet.publicKey
        )

        // Create ATA if not exists
        try {
          await getAccount(program.provider.connection, userSharesATA)
        } catch (error) {
          await createAssociatedTokenAccount(
            program.provider.connection,
            wallet as any,
            assetMint, // shares mint
            wallet.publicKey
          )
        }

        // Perform staking
        const tx = await program.methods
          .stakeInVault(new BN(amount))
          .accounts({
            user: wallet.publicKey,
            vault: vaultPDA,
            asset: vaultAssetPDA,
            userPosition: userPositionPDA,
            userSharesATA,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        return tx
      } catch (error) {
        console.error('Failed to stake in vault:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [wallet]
  )

  const unstakeFromVault = useCallback(
    async (vaultName: string, assetMint: PublicKey, amount: number): Promise<string> => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      setIsLoading(true)
      try {
        const program = createProgram(wallet as any)
        
        // Get PDAs
        const [vaultPDA] = getMultiVaultPDA(wallet.publicKey, vaultName)
        const [vaultAssetPDA] = getVaultAssetPDA(vaultPDA, assetMint)
        const [userPositionPDA] = getUserVaultPositionPDA(vaultPDA, wallet.publicKey)

        // Get user ATA for shares
        const userSharesATA = await getAssociatedTokenAddress(
          assetMint, // shares mint
          wallet.publicKey
        )

        // Perform unstaking
        const tx = await program.methods
          .unstakeFromVault(new BN(amount))
          .accounts({
            user: wallet.publicKey,
            vault: vaultPDA,
            asset: vaultAssetPDA,
            userPosition: userPositionPDA,
            userSharesATA,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        return tx
      } catch (error) {
        console.error('Failed to unstake from vault:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [wallet]
  )

  const getVaultData = useCallback(
    async (vaultName: string) => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      try {
        const program = createProgram(wallet as any)
        const [vaultPDA] = getMultiVaultPDA(wallet.publicKey, vaultName)
        
        // Get vault account
        const vaultAccount = await program.account.multiVault.fetch(vaultPDA)
        
        return vaultAccount
      } catch (error) {
        console.error('Failed to get vault data:', error)
        throw error
      }
    },
    [wallet]
  )

  const getUserVaultPosition = useCallback(
    async (vaultName: string) => {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not connected")
      }

      try {
        const program = createProgram(wallet as any)
        const [vaultPDA] = getMultiVaultPDA(wallet.publicKey, vaultName)
        const [userPositionPDA] = getUserVaultPositionPDA(vaultPDA, wallet.publicKey)
        
        // Get user position
        const userPosition = await program.account.userVaultPosition.fetch(userPositionPDA)
        
        return userPosition
      } catch (error) {
        console.error('Failed to get user vault position:', error)
        throw error
      }
    },
    [wallet]
  )

  return {
    createMultiVault,
    addAssetToVault,
    stakeInVault,
    unstakeFromVault,
    getVaultData,
    getUserVaultPosition,
    isLoading,
  }
}
