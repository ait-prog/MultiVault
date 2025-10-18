"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AssetCard } from "@/components/asset-card"
import { Calendar, TrendingUp, Wallet } from "lucide-react"

// Mock data
const mockPortfolio = [
  {
    id: "1",
    asset: "Azimut Grande 35M",
    type: "Yacht",
    shares: 5,
    totalShares: 100,
    purchasePrice: 125,
    currentValue: 132,
    income: 625,
  },
  {
    id: "2",
    asset: "Gulfstream G650",
    type: "Jet",
    shares: 3,
    totalShares: 80,
    purchasePrice: 89,
    currentValue: 94,
    income: 267,
  },
]



const availableAssets = [
  {
    id: "3",
    name: "Lamborghini Huracán",
    type: "car" as const,
    image: "/luxury-sports-car-lamborghini.jpg",
    location: "Los Angeles",
    price: 45,
    currency: "USDC" as const,
    totalShares: 50,
    availableShares: 8,
    nextAvailable: "Dec 22",
  },
  {
    id: "4",
    name: "Sunseeker Predator 74",
    type: "yacht" as const,
    image: "/luxury-yacht-ocean.png",
    location: "Ibiza",
    price: 95,
    currency: "SOL" as const,
    totalShares: 120,
    availableShares: 34,
    nextAvailable: "Jan 5",
  },
]

export function InvestorDashboard() {



  const totalPortfolioValue = mockPortfolio.reduce((sum, item) => sum + item.currentValue * item.shares, 0)
  const totalIncome = mockPortfolio.reduce((sum, item) => sum + item.income, 0)
  const totalShares = mockPortfolio.reduce((sum, item) => sum + item.shares, 0)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investor Dashboard</h1>
          <p className="text-muted-foreground">Manage your luxury asset portfolio and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome}</div>
              <p className="text-xs text-muted-foreground">From rental income</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShares}</div>
              <p className="text-xs text-muted-foreground">Across {mockPortfolio.length} assets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$892</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Assets</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Browse Assets */}
          <TabsContent value="browse" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Available Assets</h2>
              <p className="text-muted-foreground mb-6">Discover luxury assets available for investment</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableAssets.map((asset) => (
                <AssetCard key={asset.id} {...asset} />
              ))}
            </div>
          </TabsContent>

          {/* Portfolio */}
          <TabsContent value="portfolio" className="space-y-6">
            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,282</div>
                  <p className="text-xs text-muted-foreground">Across 2 assets</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+$50</div>
                  <p className="text-xs text-muted-foreground">+4.1% overall return</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$892</div>
                  <p className="text-xs text-muted-foreground">From asset usage</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Details</CardTitle>
                <CardDescription>Detailed breakdown of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Purchase Price</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Income</TableHead>
                      <TableHead>P&L</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPortfolio.map((item) => {
                      const totalValue = item.currentValue * item.shares
                      const totalCost = item.purchasePrice * item.shares
                      const pnl = totalValue - totalCost
                      const pnlPercent = ((pnl / totalCost) * 100).toFixed(1)

                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.asset}</p>
                              <p className="text-sm text-muted-foreground">{item.type}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.shares}/{item.totalShares}
                          </TableCell>
                          <TableCell>${item.purchasePrice}</TableCell>
                          <TableCell>${item.currentValue}</TableCell>
                          <TableCell className="text-green-600">+${item.income}</TableCell>
                          <TableCell>
                            <span className={pnl >= 0 ? "text-green-600" : "text-red-600"}>
                              {pnl >= 0 ? "+" : ""}${pnl} ({pnlPercent}%)
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your investment performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Return</span>
                    <span className="text-green-600 font-semibold">+4.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Annualized Return</span>
                    <span className="text-green-600 font-semibold">+12.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Best Performing Asset</span>
                    <span className="font-semibold">Azimut Grande 35M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Portfolio Diversity</span>
                    <span className="font-semibold">2 Asset Types</span>
                  </div>
                </CardContent>
              </Card>

              {/* Asset Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Distribution of your investments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Yachts</span>
                        <span className="text-sm text-muted-foreground">62.5%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '62.5%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Private Jets</span>
                        <span className="text-sm text-muted-foreground">37.5%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '37.5%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Income Trend */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Income Trend</CardTitle>
                  <CardDescription>Monthly income from your investments over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-4 text-center">
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Jul</div>
                        <div className="bg-blue-600 rounded-t" style={{height: '40px'}}></div>
                        <div className="text-xs font-medium">$720</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Aug</div>
                        <div className="bg-blue-600 rounded-t" style={{height: '55px'}}></div>
                        <div className="text-xs font-medium">$810</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Sep</div>
                        <div className="bg-blue-600 rounded-t" style={{height: '45px'}}></div>
                        <div className="text-xs font-medium">$765</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Oct</div>
                        <div className="bg-blue-600 rounded-t" style={{height: '60px'}}></div>
                        <div className="text-xs font-medium">$845</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Nov</div>
                        <div className="bg-blue-600 rounded-t" style={{height: '50px'}}></div>
                        <div className="text-xs font-medium">$780</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Dec</div>
                        <div className="bg-green-600 rounded-t" style={{height: '70px'}}></div>
                        <div className="text-xs font-medium">$892</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transaction History */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your investment transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Monthly Dividend Payment</p>
                      <p className="text-sm text-muted-foreground">Portfolio Income • Dec 1, 2024</p>
                    </div>
                    <span className="font-semibold text-green-600">+$892</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Asset Appreciation</p>
                      <p className="text-sm text-muted-foreground">Azimut Grande 35M • Nov 28, 2024</p>
                    </div>
                    <span className="font-semibold text-green-600">+$35</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Purchased 5 shares</p>
                      <p className="text-sm text-muted-foreground">Azimut Grande 35M • Nov 15, 2024</p>
                    </div>
                    <span className="font-semibold text-red-600">-$625</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Monthly Dividend Payment</p>
                      <p className="text-sm text-muted-foreground">Portfolio Income • Nov 1, 2024</p>
                    </div>
                    <span className="font-semibold text-green-600">+$780</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Purchased 3 shares</p>
                      <p className="text-sm text-muted-foreground">Gulfstream G650 • Oct 28, 2024</p>
                    </div>
                    <span className="font-semibold text-red-600">-$267</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Asset Appreciation</p>
                      <p className="text-sm text-muted-foreground">Gulfstream G650 • Oct 15, 2024</p>
                    </div>
                    <span className="font-semibold text-green-600">+$15</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
