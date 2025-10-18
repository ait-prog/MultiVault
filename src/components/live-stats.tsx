"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

interface LiveStatsProps {
  className?: string
}

export function LiveStats({ className }: LiveStatsProps) {
  const [stats, setStats] = useState({
    totalValue: 0,
    totalUsers: 0,
    totalAssets: 0,
    transactions24h: 0
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalValue: prev.totalValue + Math.random() * 1000,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalAssets: prev.totalAssets + Math.floor(Math.random() * 2),
        transactions24h: prev.transactions24h + Math.floor(Math.random() * 5)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(stats.totalValue / 1000000).toFixed(1)}M
          </div>
          <p className="text-xs text-muted-foreground">
            +12.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalUsers.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +180 from last week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tokenized Assets</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalAssets}
          </div>
          <p className="text-xs text-muted-foreground">
            +2 this week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.transactions24h}
          </div>
          <p className="text-xs text-muted-foreground">
            transactions
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
