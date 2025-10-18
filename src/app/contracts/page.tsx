"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { 
  Code, 
  Shield, 
  Activity, 
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react"

// Mock smart contract data
const contractsData = {
  totalContracts: 15,
  activeContracts: 12,
  totalValue: 2500000,
  recentActivity: [
    {
      id: "1",
      contract: "Real Estate Tokenization",
      action: "Asset Initialized",
      timestamp: "2024-12-10T10:30:00Z",
      status: "success",
      value: 500000
    },
    {
      id: "2", 
      contract: "Digital Art Collection",
      action: "Shares Minted",
      timestamp: "2024-12-10T09:15:00Z",
      status: "success",
      value: 25000
    },
    {
      id: "3",
      contract: "Tech Startup Equity",
      action: "Price Updated",
      timestamp: "2024-12-10T08:45:00Z",
      status: "pending",
      value: 0
    }
  ],
  contracts: [
    {
      id: "1",
      name: "Real Estate Tokenization",
      address: "EF9CQ7WfxzUmTpmQxhMv9WFCJoLkyTKniXdDYXaUg5Kh",
      type: "Asset Management",
      status: "active",
      totalValue: 1500000,
      transactions: 1250,
      lastActivity: "2024-12-10T10:30:00Z",
      description: "Smart contract for tokenizing real estate assets into tradeable tokens"
    },
    {
      id: "2",
      name: "Digital Art Collection",
      address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      type: "NFT Management",
      status: "active",
      totalValue: 750000,
      transactions: 890,
      lastActivity: "2024-12-10T09:15:00Z",
      description: "Contract managing digital art collection tokenization and fractional ownership"
    },
    {
      id: "3",
      name: "Tech Startup Equity",
      address: "5MxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD",
      type: "Equity Management",
      status: "active",
      totalValue: 250000,
      transactions: 450,
      lastActivity: "2024-12-10T08:45:00Z",
      description: "Smart contract for managing startup equity tokenization and trading"
    }
  ]
}

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Smart Contracts</h1>
            <p className="text-muted-foreground">Monitor and interact with MultiVault smart contracts</p>
          </div>
          <WalletConnectModal />
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contractsData.totalContracts}</div>
              <p className="text-xs text-muted-foreground">
                {contractsData.activeContracts} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${contractsData.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Tokenized assets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contractsData.contracts.reduce((sum, contract) => sum + contract.transactions, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                Audit verified
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <div className="grid gap-6">
              {contractsData.contracts.map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Code className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{contract.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{contract.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                          {contract.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Contract Address</p>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono">{contract.address.slice(0, 8)}...{contract.address.slice(-8)}</code>
                          <Button size="sm" variant="ghost">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="text-sm font-medium">{contract.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="text-sm font-medium">${contract.totalValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Transactions</p>
                        <p className="text-sm font-medium">{contract.transactions.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">Interact</Button>
                      <Button size="sm" variant="outline">Read Contract</Button>
                      <Button size="sm" variant="outline">View Source</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contract Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractsData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.status === 'success' ? 'bg-green-100 text-green-600' : 
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-red-100 text-red-600'
                        }`}>
                          {activity.status === 'success' && <CheckCircle className="h-4 w-4" />}
                          {activity.status === 'pending' && <Clock className="h-4 w-4" />}
                          {activity.status === 'error' && <AlertCircle className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.contract}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.value > 0 && (
                          <p className="font-medium">${activity.value.toLocaleString()}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                        <Badge variant={activity.status === 'success' ? 'default' : 'secondary'}>
                          {activity.status}
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
                  <CardTitle>Contract Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contractsData.contracts.map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="text-sm">{contract.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{contract.transactions}</span>
                          <p className="text-xs text-muted-foreground">transactions</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Value Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contractsData.contracts.map((contract) => {
                      const percentage = (contract.totalValue / contractsData.totalValue) * 100;
                      return (
                        <div key={contract.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="text-sm">{contract.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                            <p className="text-xs text-muted-foreground">${contract.totalValue.toLocaleString()}</p>
                          </div>
                        </div>
                      );
                    })}
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
