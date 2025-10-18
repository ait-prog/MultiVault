"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"

interface Transaction {
  id: string
  type: "buy" | "sell" | "stake" | "unstake"
  asset: string
  amount: number
  price: number
  timestamp: string
  status: "completed" | "pending" | "failed"
}

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Mock data
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        type: "buy",
        asset: "Real Estate Portfolio",
        amount: 10,
        price: 250,
        timestamp: "2 minutes ago",
        status: "completed"
      },
      {
        id: "2",
        type: "stake",
        asset: "Digital Art Collection",
        amount: 5,
        price: 89,
        timestamp: "5 minutes ago",
        status: "completed"
      },
      {
        id: "3",
        type: "sell",
        asset: "Tech Startup Equity",
        amount: 3,
        price: 45,
        timestamp: "10 minutes ago",
        status: "pending"
      },
      {
        id: "4",
        type: "unstake",
        asset: "Real Estate Portfolio",
        amount: 2,
        price: 250,
        timestamp: "15 minutes ago",
        status: "completed"
      }
    ]

    setTransactions(mockTransactions)
  }, [])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
      case "stake":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />
      case "sell":
      case "unstake":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "buy":
      case "stake":
        return "bg-green-100 text-green-800"
      case "sell":
      case "unstake":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getTransactionColor(tx.type)}`}>
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <p className="font-medium capitalize">{tx.type} {tx.amount} shares</p>
                  <p className="text-sm text-muted-foreground">{tx.asset}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${(tx.amount * tx.price).toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                  <Badge className={getStatusColor(tx.status)}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
