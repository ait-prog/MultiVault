"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, PieChart, Building2 } from "lucide-react"

interface TrendingAsset {
  id: string
  name: string
  type: "real_estate" | "digital_art" | "equity"
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

export function TrendingAssets() {
  const trendingAssets: TrendingAsset[] = [
    {
      id: "1",
      name: "Real Estate Portfolio",
      type: "real_estate",
      price: 250,
      change24h: 5.2,
      volume24h: 125000,
      marketCap: 2500000
    },
    {
      id: "2",
      name: "Digital Art Collection",
      type: "digital_art",
      price: 89,
      change24h: -2.1,
      volume24h: 89000,
      marketCap: 445000
    },
    {
      id: "3",
      name: "Tech Startup Equity",
      type: "equity",
      price: 45,
      change24h: 8.7,
      volume24h: 67000,
      marketCap: 900000
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "real_estate":
        return <Building2 className="h-5 w-5 text-green-600" />
      case "digital_art":
        return <PieChart className="h-5 w-5 text-purple-600" />
      case "equity":
        return <BarChart3 className="h-5 w-5 text-blue-600" />
      default:
        return <BarChart3 className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "real_estate":
        return "bg-green-100 text-green-800"
      case "digital_art":
        return "bg-purple-100 text-purple-800"
      case "equity":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingAssets.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  {getTypeIcon(asset.type)}
                </div>
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(asset.type)}>
                      {asset.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Vol: ${(asset.volume24h / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${asset.price}</p>
                <div className="flex items-center gap-2">
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
