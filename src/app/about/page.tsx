"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, TrendingUp, Shield, Coins, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About MultiVault
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Blockchain Platform for Asset Tokenization
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            MultiVault is a blockchain platform that converts real and digital assets into tradeable tokens, 
            enabling fractional ownership and global liquidity for diverse investment opportunities.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To create a blockchain platform that transforms real and digital assets into tradeable tokens, 
                enabling fractional ownership and global liquidity for diverse investment opportunities through 
                smart contracts and decentralized technology.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading blockchain platform for asset tokenization, creating a global 
                ecosystem where any asset can be transformed into tradeable tokens, providing 
                fractional ownership and liquidity to investors worldwide.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">How MultiVault Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Asset Tokenization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Convert real and digital assets into tradeable tokens using smart contracts, 
                  enabling fractional ownership and blockchain-based asset management.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Coins className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Smart Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automated smart contracts manage asset ownership, transfers, and revenue distribution, 
                  ensuring transparency and security in all transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Global Liquidity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tokenized assets provide 24/7 global liquidity, enabling instant trading and 
                  fractional ownership across diverse asset classes with transparent pricing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Why Choose MultiVault</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg text-primary">Secure & Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Smart contract-based asset management with full transparency and immutable records.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg text-primary">Fractional Ownership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Own fractions of high-value assets through tokenized ownership.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Coins className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg text-primary">Global Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Access diverse asset classes from anywhere in the world with 24/7 trading.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg text-primary">Smart Contract Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Automated asset management through smart contracts ensures efficiency and transparency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary/5 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Platform Statistics</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
              <p className="text-muted-foreground">Tokenized Assets</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-muted-foreground">Token Holders</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Global Trading</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Smart Contracts</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Built by Blockchain Experts</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our team combines decades of experience in blockchain technology, smart contract development, 
            and financial services to deliver a secure and innovative asset tokenization platform.
          </p>
        </div>
      </div>
    </div>
  )
}