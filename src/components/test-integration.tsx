"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/lib/wallet-context"
import { useAssetOperations } from "@/lib/solana-hooks"
import { PublicKey } from "@solana/web3.js"
import { toast } from "@/hooks/use-toast"

export function TestIntegration() {
  const { wallet } = useWallet()
  const { createAsset, isLoading: assetLoading } = useAssetOperations()
  const { stake, unstake, claim, isLoading: stakingLoading } = useStakingOperations()
  const { rentAsset, isLoading: rentalLoading } = useRentalOperations()
  
  const [assetPDA, setAssetPDA] = useState<string>("")
  const [stakeAmount, setStakeAmount] = useState<string>("1")
  const [rentDays, setRentDays] = useState<string>("1")

  const handleCreateAsset = async () => {
    if (!wallet.connected) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    try {
      const pda = await createAsset({
        name: "Test Yacht",
        baseDailyPriceUsd: 1000000, // $1000 per day (6 decimals)
        feeBps: 500, // 5% fee
      })
      
      setAssetPDA(pda)
      toast({
        title: "Success",
        description: `Asset created: ${pda}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create asset: ${error}`,
        variant: "destructive",
      })
    }
  }

  const handleStake = async () => {
    if (!assetPDA) {
      toast({
        title: "Error",
        description: "Please create an asset first",
        variant: "destructive",
      })
      return
    }

    try {
      const tx = await stake(new PublicKey(assetPDA), parseInt(stakeAmount))
      toast({
        title: "Success",
        description: `Staked ${stakeAmount} shares. TX: ${tx}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to stake: ${error}`,
        variant: "destructive",
      })
    }
  }

  const handleRent = async () => {
    if (!assetPDA) {
      toast({
        title: "Error",
        description: "Please create an asset first",
        variant: "destructive",
      })
      return
    }

    try {
      const tx = await rentAsset(new PublicKey(assetPDA), parseInt(rentDays))
      toast({
        title: "Success",
        description: `Rented for ${rentDays} days. TX: ${tx}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to rent: ${error}`,
        variant: "destructive",
      })
    }
  }

  if (!wallet.connected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Integration</CardTitle>
          <CardDescription>Connect your wallet to test the integration</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Test Solana Integration</CardTitle>
        <CardDescription>Test the connection between frontend and Solana program</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">1. Create Asset</h3>
          <Button 
            onClick={handleCreateAsset} 
            disabled={assetLoading}
            className="w-full"
          >
            {assetLoading ? "Creating..." : "Create Test Asset"}
          </Button>
          {assetPDA && (
            <p className="text-sm text-muted-foreground">
              Asset PDA: {assetPDA}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">2. Stake Shares</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Amount"
              className="flex-1 px-3 py-2 border rounded"
            />
            <Button 
              onClick={handleStake} 
              disabled={stakingLoading || !assetPDA}
            >
              {stakingLoading ? "Staking..." : "Stake"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">3. Rent Asset</h3>
          <div className="flex gap-2">
            <input
              type="number"
              value={rentDays}
              onChange={(e) => setRentDays(e.target.value)}
              placeholder="Days"
              className="flex-1 px-3 py-2 border rounded"
            />
            <Button 
              onClick={handleRent} 
              disabled={rentalLoading || !assetPDA}
            >
              {rentalLoading ? "Renting..." : "Rent"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">4. Claim Rewards</h3>
          <Button 
            onClick={() => claim(new PublicKey(assetPDA))} 
            disabled={stakingLoading || !assetPDA}
            className="w-full"
          >
            {stakingLoading ? "Claiming..." : "Claim Rewards"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
