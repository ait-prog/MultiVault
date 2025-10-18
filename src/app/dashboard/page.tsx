"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InvestorDashboard } from "@/components/dashboard/investor-dashboard"
import { useWallet } from "@/lib/wallet-context"
import { WalletConnect } from "@/components/wallet-connect"


export default function DashboardPage() {
  const { wallet } = useWallet()
  // Users are automatically set as investors in the new business model

  if (!wallet.connected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Connect your wallet to access your dashboard</p>
            </div>
            <WalletConnect />
          </div>
        </div>
        <Footer />
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <InvestorDashboard />
      <Footer />
    </div>
  )
}
