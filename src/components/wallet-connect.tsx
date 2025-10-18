"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, LogOut, RefreshCw } from "lucide-react"
import { useWallet } from "@/lib/wallet-context"
import { toast } from "@/hooks/use-toast"

export function WalletConnect() {
  const { wallet, connectWallet, disconnectWallet, refreshBalance } = useWallet()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleConnect = async () => {
    try {
      await connectWallet()
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to wallet",
      })
    } catch {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const copyAddress = async () => {
    if (wallet.publicKey) {
      await navigator.clipboard.writeText(wallet.publicKey.toString())
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleRefreshBalance = async () => {
    setIsRefreshing(true)
    try {
      await refreshBalance()
      toast({
        title: "Balance Updated",
        description: "Your wallet balance has been refreshed",
      })
    } catch {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh balance. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  if (!wallet.connected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </CardTitle>
          <CardDescription>Connect your Solana wallet to start investing in luxury assets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleConnect} className="w-full" size="lg" disabled={wallet.connecting}>
            <Wallet className="w-4 h-4 mr-2" />
            {wallet.connecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            {wallet.walletName ? wallet.walletName.charAt(0).toUpperCase() + wallet.walletName.slice(1) : 'Unknown'} Wallet
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={`https://explorer.solana.com/address/${wallet.publicKey?.toString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>
          <p className="font-mono text-sm bg-muted p-2 rounded">
            {wallet.publicKey?.toString().slice(0, 8)}...{wallet.publicKey?.toString().slice(-8)}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <Button variant="ghost" size="sm" onClick={handleRefreshBalance} disabled={isRefreshing}>
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>SOL</span>
              <span className="font-semibold">{wallet.balance?.sol.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>USDC</span>
              <span className="font-semibold">{wallet.balance?.usdc.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleDisconnect} variant="outline" className="w-full bg-transparent">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  )
}
