import { type NextRequest, NextResponse } from "next/server"
import { bookingAPI } from "@/lib/api"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// POST /api/bookings - Create booking request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assetId, assetName, renterId, startDate, endDate, amount, currency, location } = body

    // Validate required fields
    if (!assetId || !assetName || !renterId || !startDate || !endDate || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const bookingData = {
      assetId,
      assetName,
      renterId,
      startDate,
      endDate,
      amount: Number(amount),
      currency: currency || "SOL",
      status: "pending" as const,
      location: location || "Unknown",
    }

    const newBooking = await bookingAPI.createBooking(bookingData)
    return NextResponse.json({ success: true, data: newBooking }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 })
  }
}
