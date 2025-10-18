"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WalletConnect } from "@/components/wallet-connect"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Globe } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Connect Your Wallet</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Securely connect your Solana wallet to start investing in fractional luxury assets
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Wallet Connection */}
            <div className="flex justify-center">
              <WalletConnect />
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Why Connect Your Wallet?</h2>

              <div className="space-y-4">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      Secure & Decentralized
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Your wallet remains in your control. We never store your private keys or have access to your
                      funds.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      Instant Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Buy and sell asset shares instantly with low fees on the Solana blockchain.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      Global Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Access luxury assets from anywhere in the world with just your wallet connection.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
