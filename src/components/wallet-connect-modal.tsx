"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/lib/wallet-context"
import { Wallet, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const WALLET_OPTIONS = [
  {
    id: "phantom",
    name: "Phantom",
    description: "The most popular Solana wallet",
    icon: "👻",
    popular: true,
  },
  {
    id: "solflare",
    name: "Solflare",
    description: "Secure and feature-rich wallet",
    icon: "☀️",
    popular: false,
  },
  {
    id: "backpack",
    name: "Backpack",
    description: "All-in-one crypto wallet",
    icon: "🎒",
    popular: false,
  },
]

export function WalletConnectModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { wallet, connectWallet, disconnectWallet } = useWallet()

  const handleConnect = async (walletId: string) => {
    try {
      setIsConnecting(true)
      await connectWallet(walletId)
      setIsOpen(false)
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    setIsOpen(false)
  }

  if (wallet.connected) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="hidden sm:inline">
              {wallet.publicKey?.toString().slice(0, 8)}...{wallet.publicKey?.toString().slice(-8)}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Connected
            </DialogTitle>
            <DialogDescription>
              Your wallet is successfully connected to MultiVault
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium">Wallet Address</div>
              <div className="text-xs text-muted-foreground font-mono break-all">
                {wallet.publicKey?.toString()}
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium">Balance</div>
              <div className="text-lg font-bold">
                {wallet.balance?.sol.toFixed(4)} SOL
              </div>
              <div className="text-sm text-muted-foreground">
                {wallet.balance?.usdc.toFixed(2)} USDC
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => window.open(`https://solscan.io/account/${wallet.publicKey?.toString()}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Solscan
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to MultiVault and start tokenizing assets
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {WALLET_OPTIONS.map((walletOption) => (
            <Button
              key={walletOption.id}
              variant="outline"
              className={cn(
                "w-full justify-start p-4 h-auto",
                isConnecting && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleConnect(walletOption.id)}
              disabled={isConnecting}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="text-2xl">{walletOption.icon}</div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{walletOption.name}</span>
                    {walletOption.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {walletOption.description}
                  </div>
                </div>
                {isConnecting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                )}
              </div>
            </Button>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span>Don&apos;t have a wallet? Download one from the options above</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
