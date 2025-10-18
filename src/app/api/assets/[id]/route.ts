import { type NextRequest, NextResponse } from "next/server"
import { assetAPI } from "@/lib/api"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/assets/[id] - Get asset by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const asset = await assetAPI.getAsset(id)
    if (!asset) {
      return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: asset })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch asset" }, { status: 500 })
  }
}

// PUT /api/assets/[id] - Update asset
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedAsset = await assetAPI.updateAsset(id, body)

    if (!updatedAsset) {
      return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedAsset })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update asset" }, { status: 500 })
  }
}
