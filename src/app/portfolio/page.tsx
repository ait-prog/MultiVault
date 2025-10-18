"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

// Mock portfolio data
const portfolioData = {
  totalValue: 125000,
  totalReturn: 15.2,
  totalReturnAmount: 19000,
  assets: [
    {
      id: "1",
      name: "Real Estate Portfolio",
      type: "real_estate",
      value: 75000,
      shares: 300,
      totalShares: 1000,
      pricePerShare: 250,
      change24h: 2.5,
      allocation: 60
    },
    {
      id: "2", 
      name: "Digital Art Collection",
      type: "digital_art",
      value: 35000,
      shares: 175,
      totalShares: 500,
      pricePerShare: 200,
      change24h: -1.2,
      allocation: 28
    },
    {
      id: "3",
      name: "Tech Startup Equity", 
      type: "equity",
      value: 15000,
      shares: 75,
      totalShares: 200,
      pricePerShare: 200,
      change24h: 5.8,
      allocation: 12
    }
  ],
  recentTransactions: [
    {
      id: "1",
      type: "buy",
      asset: "Real Estate Portfolio",
      amount: 10,
      price: 250,
      timestamp: "2024-12-10T10:30:00Z",
      status: "completed"
    },
    {
      id: "2",
      type: "sell", 
      asset: "Digital Art Collection",
      amount: 5,
      price: 200,
      timestamp: "2024-12-09T14:20:00Z",
      status: "completed"
    },
    {
      id: "3",
      type: "buy",
      asset: "Tech Startup Equity",
      amount: 15,
      price: 200,
      timestamp: "2024-12-08T09:15:00Z",
      status: "pending"
    }
  ]
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">Track your tokenized asset investments and performance</p>
          </div>
          <WalletConnectModal />
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{portfolioData.totalReturn}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${portfolioData.totalReturnAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{portfolioData.totalReturn}% return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.assets.length}</div>
              <p className="text-xs text-muted-foreground">
                Tokenized assets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolioData.assets.reduce((sum, asset) => sum + asset.shares, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Token shares owned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <div className="grid gap-6">
              {portfolioData.assets.map((asset) => (
                <Card key={asset.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {asset.type === 'real_estate' && <BarChart3 className="h-6 w-6 text-primary" />}
                          {asset.type === 'digital_art' && <PieChart className="h-6 w-6 text-primary" />}
                          {asset.type === 'equity' && <TrendingUp className="h-6 w-6 text-primary" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{asset.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {asset.shares} / {asset.totalShares} shares
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${asset.value.toLocaleString()}</div>
                        <div className="flex items-center space-x-2">
                          {asset.change24h > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm ${asset.change24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Price per Share</p>
                        <p className="text-lg font-semibold">${asset.pricePerShare}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Allocation</p>
                        <p className="text-lg font-semibold">{asset.allocation}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <Badge variant="outline" className="capitalize">
                          {asset.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm">Buy More</Button>
                      <Button size="sm" variant="outline">Sell</Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === 'buy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {tx.type === 'buy' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.amount} shares</p>
                          <p className="text-sm text-muted-foreground">{tx.asset}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(tx.amount * tx.price).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </p>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.assets.map((asset) => (
                      <div key={asset.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="text-sm">{asset.name}</span>
                        </div>
                        <span className="text-sm font-medium">{asset.allocation}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Best Performer</span>
                      <span className="text-sm font-medium">Tech Startup Equity (+5.8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Worst Performer</span>
                      <span className="text-sm font-medium">Digital Art Collection (-1.2%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Return</span>
                      <span className="text-sm font-medium">+2.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
