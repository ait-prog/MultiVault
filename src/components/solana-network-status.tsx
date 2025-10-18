"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Clock, CheckCircle } from "lucide-react"

export function SolanaNetworkStatus() {
  const [networkStats, setNetworkStats] = useState({
    tps: 0,
    blockHeight: 0,
    slotTime: 0,
    status: "healthy" as "healthy" | "degraded" | "down"
  })

  useEffect(() => {
    // Simulate real-time network data
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        tps: Math.floor(Math.random() * 2000) + 1000,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3) + 1,
        slotTime: Math.random() * 0.5 + 0.4,
        status: "healthy"
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "down":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "degraded":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "down":
        return <Activity className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-purple-600" />
          Solana Network Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network Status</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(networkStats.status)}
              <Badge className={getStatusColor(networkStats.status)}>
                {networkStats.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Transactions/sec</p>
              <p className="text-2xl font-bold text-primary">{networkStats.tps.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Block Height</p>
              <p className="text-2xl font-bold text-primary">{networkStats.blockHeight.toLocaleString()}</p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Slot Time</span>
              <span className="text-sm font-medium">{networkStats.slotTime.toFixed(2)}s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
