"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { WalletBalance, WalletState } from './types'
import { connection, USDC_MINT } from './solana-config'
import { getAssociatedTokenAddress } from '@solana/spl-token'

interface WalletContextType {
  wallet: WalletState
  connectWallet: (walletName?: string) => Promise<void>
  disconnectWallet: () => void
  refreshBalance: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    connecting: false,
  })

  // Use Solana Wallet Adapter
  const {
    publicKey,
    connected,
    connecting,
    connect,
    disconnect,
    wallet: adapterWallet,
  } = useSolanaWallet()

  // Update state when connection changes
  useEffect(() => {
    setWallet({
      connected,
      connecting,
      publicKey: publicKey || undefined,
      walletName: adapterWallet?.adapter?.name,
    })
  }, [connected, connecting, publicKey, adapterWallet])

  // Wallet connection
  const connectWallet = async (walletName?: string) => {
    try {
      if (walletName && adapterWallet?.adapter?.name !== walletName) {
        // If a specific wallet is requested and it's not the current one, we need to select it
        // This is handled by the wallet adapter's select method
        console.log(`Attempting to connect to ${walletName}`)
      }
      await connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  // Wallet disconnection
  const disconnectWallet = () => {
    disconnect()
  }

  // Balance update
  const refreshBalance = async () => {
    if (!publicKey) return

    try {
      // Get SOL balance
      const solBalance = await connection.getBalance(publicKey)
      const sol = solBalance / LAMPORTS_PER_SOL

      // Get USDC balance
      let usdc = 0
      try {
        const usdcTokenAccount = await getAssociatedTokenAddress(USDC_MINT, publicKey)
        const usdcBalance = await connection.getTokenAccountBalance(usdcTokenAccount)
        usdc = parseFloat(usdcBalance.value.amount) / Math.pow(10, usdcBalance.value.decimals)
      } catch (error) {
        // USDC token account does not exist
        usdc = 0
      }

      const balance: WalletBalance = { sol, usdc }

      setWallet((prev) => ({ ...prev, balance }))
    } catch (error) {
      console.error('Failed to refresh balance:', error)
    }
  }

  // Update balance when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      refreshBalance()
    }
  }, [connected, publicKey])

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, refreshBalance }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
