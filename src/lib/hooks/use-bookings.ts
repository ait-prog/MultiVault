"use client"

import { useState } from "react"
import type { Booking } from "@/lib/api"

export function useBookings() {
  const [isLoading, setIsLoading] = useState(false)

  const createBooking = async (bookingData: Omit<Booking, "id">) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()
      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch {
      throw new Error("Failed to create booking")
    } finally {
      setIsLoading(false)
    }
  }

  const purchaseShares = async (purchaseData: {
    assetId: string
    assetName: string
    buyerId: string
    shares: number
    pricePerShare: number
    currency: "SOL" | "USDC"
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/shares/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      })

      const result = await response.json()
      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch {
      throw new Error("Failed to purchase shares")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createBooking,
    purchaseShares,
    isLoading,
  }
}
