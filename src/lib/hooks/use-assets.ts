"use client"

import { useState, useEffect } from "react"
import type { Asset } from "@/lib/api"

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("/api/assets")
        const result = await response.json()

        if (result.success) {
          setAssets(result.data)
        } else {
          setError(result.error)
        }
      } catch {
        setError("Failed to fetch assets")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssets()
  }, [])

  const createAsset = async (assetData: Omit<Asset, "id" | "createdAt">) => {
    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetData),
      })

      const result = await response.json()
      if (result.success) {
        setAssets((prev) => [...prev, result.data])
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch {
      throw new Error("Failed to create asset")
    }
  }

  return {
    assets,
    isLoading,
    error,
    createAsset,
  }
}
