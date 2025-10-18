import { type NextRequest, NextResponse } from "next/server"
import { shareAPI } from "@/lib/api"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// POST /api/shares/purchase - Purchase asset shares
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assetId, assetName, buyerId, shares, pricePerShare, currency } = body

    // Validate required fields
    if (!assetId || !assetName || !buyerId || !shares || !pricePerShare) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const purchaseData = {
      assetId,
      assetName,
      buyerId,
      shares: Number(shares),
      pricePerShare: Number(pricePerShare),
      currency: currency || "SOL",
      totalAmount: Number(shares) * Number(pricePerShare),
    }

    const purchase = await shareAPI.purchaseShares(purchaseData)
    return NextResponse.json({ success: true, data: purchase }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to purchase shares" }, { status: 500 })
  }
}
