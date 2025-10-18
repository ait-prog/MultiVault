export interface Asset {
  id: string
  name: string
  type: "yacht" | "jet" | "car"
  description: string
  image: string
  location: string
  price: number
  currency: "SOL" | "USDC"
  totalShares: number
  availableShares: number
  nextAvailable: string
  ownerId: string
  status: "active" | "pending" | "inactive"
  createdAt: string
}

export interface Booking {
  id: string
  assetId: string
  assetName: string
  renterId: string
  startDate: string
  endDate: string
  amount: number
  currency: "SOL" | "USDC"
  status: "pending" | "approved" | "cancelled" | "completed"
  location: string
}

export interface SharePurchase {
  id: string
  assetId: string
  assetName: string
  buyerId: string
  shares: number
  pricePerShare: number
  currency: "SOL" | "USDC"
  totalAmount: number
  transactionHash?: string
  timestamp: string
}

// Mock data
const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Azimut Grande 35M",
    type: "yacht",
    description: "Luxury yacht with premium amenities",
    image: "/luxury-yacht-ocean.png",
    location: "Monaco",
    price: 125,
    currency: "SOL",
    totalShares: 100,
    availableShares: 23,
    nextAvailable: "Dec 15",
    ownerId: "owner1",
    status: "active",
    createdAt: "2024-10-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Gulfstream G650",
    type: "jet",
    description: "Private jet for luxury travel",
    image: "/private-jet-on-tarmac.jpg",
    location: "Miami",
    price: 89,
    currency: "SOL",
    totalShares: 80,
    availableShares: 12,
    nextAvailable: "Jan 8",
    ownerId: "owner2",
    status: "active",
    createdAt: "2024-09-15T00:00:00Z",
  },
]

// Asset API functions
export const assetAPI = {
  // Get all assets
  getAssets: async (): Promise<Asset[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return mockAssets
  },

  // Get asset by ID
  getAsset: async (id: string): Promise<Asset | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockAssets.find((asset) => asset.id === id) || null
  },

  // Create new asset (for owners)
  createAsset: async (assetData: Omit<Asset, "id" | "createdAt">): Promise<Asset> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newAsset: Asset = {
      ...assetData,
      id: `asset_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    mockAssets.push(newAsset)
    return newAsset
  },

  // Update asset
  updateAsset: async (id: string, updates: Partial<Asset>): Promise<Asset | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const assetIndex = mockAssets.findIndex((asset) => asset.id === id)
    if (assetIndex === -1) return null

    mockAssets[assetIndex] = { ...mockAssets[assetIndex], ...updates }
    return mockAssets[assetIndex]
  },
}

// Booking API functions
export const bookingAPI = {
  // Create booking request
  createBooking: async (bookingData: Omit<Booking, "id">): Promise<Booking> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newBooking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
    }
    return newBooking
  },

  // Get bookings for user
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    // Mock bookings for demo
    return [
      {
        id: "1",
        assetId: "1",
        assetName: "Azimut Grande 35M",
        renterId: userId,
        startDate: "2024-12-15",
        endDate: "2024-12-22",
        amount: 2.5,
        currency: "SOL",
        status: "approved",
        location: "Monaco",
      },
    ]
  },

  // Update booking status (for owners)
  updateBookingStatus: async (bookingId: string, status: Booking["status"]): Promise<Booking | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock update
    return {
      id: bookingId,
      assetId: "1",
      assetName: "Azimut Grande 35M",
      renterId: "user123",
      startDate: "2024-12-15",
      endDate: "2024-12-22",
      amount: 2.5,
      currency: "SOL",
      status,
      location: "Monaco",
    }
  },
}

// Share trading API functions
export const shareAPI = {
  // Purchase shares
  purchaseShares: async (purchaseData: Omit<SharePurchase, "id" | "timestamp">): Promise<SharePurchase> => {
    await new Promise((resolve) => setTimeout(resolve, 1200)) // Simulate blockchain transaction
    const purchase: SharePurchase = {
      ...purchaseData,
      id: `purchase_${Date.now()}`,
      timestamp: new Date().toISOString(),
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Mock transaction hash
    }
    return purchase
  },

  // Get user's share portfolio
  getUserPortfolio: async (userId: string): Promise<SharePurchase[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Mock portfolio data
    return [
      {
        id: "1",
        assetId: "1",
        assetName: "Azimut Grande 35M",
        buyerId: userId,
        shares: 5,
        pricePerShare: 125,
        currency: "SOL",
        totalAmount: 625,
        transactionHash: "0xabc123...",
        timestamp: "2024-11-15T00:00:00Z",
      },
    ]
  },
}

// IPFS/Arweave mock functions
export const storageAPI = {
  // Upload image to IPFS (mocked)
  uploadImage: async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Mock IPFS hash
    return `ipfs://QmX${Math.random().toString(36).substr(2, 44)}`
  },

  // Upload metadata to Arweave (mocked)
  uploadMetadata: async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Mock Arweave transaction ID
    return `ar://${Math.random().toString(36).substr(2, 43)}`
  },
}
