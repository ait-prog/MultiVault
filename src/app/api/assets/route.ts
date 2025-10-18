import { type NextRequest, NextResponse } from "next/server"
import { assetAPI } from "@/lib/api"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/assets - Get all assets
export async function GET() {
  try {
    const assets = await assetAPI.getAssets()
    return NextResponse.json({ success: true, data: assets })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch assets" }, { status: 500 })
  }
}

// POST /api/assets - Create new asset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, description, image, location, price, currency, totalShares, ownerId } = body

    // Validate required fields
    if (!name || !type || !description || !price || !totalShares || !ownerId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const assetData = {
      name,
      type,
      description,
      image: image || "/placeholder.svg",
      location: location || "Unknown",
      price: Number(price),
      currency: currency || "SOL",
      totalShares: Number(totalShares),
      availableShares: Number(totalShares), // Initially all shares are available
      nextAvailable: "Available now",
      ownerId,
      status: "pending" as const,
    }

    const newAsset = await assetAPI.createAsset(assetData)
    return NextResponse.json({ success: true, data: newAsset }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create asset" }, { status: 500 })
  }
}
