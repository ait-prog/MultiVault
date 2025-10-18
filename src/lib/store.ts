import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  walletAddress?: string
}

interface Property {
  id: string
  name: string
  type: 'yacht' | 'jet' | 'car'
  image: string
  location: string
  price: number
  currency: 'SOL' | 'USDC'
  totalShares: number
  availableShares: number
  nextAvailable: string
  // Financial data
  monthlyRevenue?: number
  yearlyGrowth?: number
  totalRevenue?: number
  occupancyRate?: number
  avgDailyRate?: number
  expenses?: number
  netIncome?: number
  description?: string
  revenue?: {
    monthly: number
    yearly: number
    growth: number
  }
  performance?: {
    totalReturn: number
    annualizedReturn: number
    volatility: number
  }
}

interface PortfolioItem {
  id: string
  name: string
  shares: number
  value: number
  type: string
}

interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (user: User) => void
  logout: () => void
  
  // Properties state
  properties: Property[]
  selectedProperty: Property | null
  setProperties: (properties: Property[]) => void
  setSelectedProperty: (property: Property | null) => void
  getPropertyById: (id: string) => Property | undefined
  
  // Portfolio state
  portfolio: PortfolioItem[]
  addToPortfolio: (item: PortfolioItem) => void
  
  // UI state
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Properties state
      properties: [],
      selectedProperty: null,
      setProperties: (properties: Property[]) => set({ properties }),
      setSelectedProperty: (property: Property | null) => set({ selectedProperty: property }),
      getPropertyById: (id: string) => get().properties.find((p: Property) => p.id === id),
      
      // Portfolio state
      portfolio: [],
      addToPortfolio: (item: PortfolioItem) => {
        const currentPortfolio = get().portfolio;
        const existingItem = currentPortfolio.find(p => p.id === item.id);
        if (existingItem) {
          set({
            portfolio: currentPortfolio.map(p => 
              p.id === item.id 
                ? { ...p, shares: p.shares + item.shares, value: p.value + item.value }
                : p
            )
          });
        } else {
          set({ portfolio: [...currentPortfolio, item] });
        }
      },
      
      // UI state
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'luxeshare-storage',
      partialize: (state: AppState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        portfolio: state.portfolio,
      }),
    }
  )
)

// Mock properties data
export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Azimut Grande 35M',
    type: 'yacht',
    image: '/luxury-yacht-ocean.png',
    location: 'Monaco',
    price: 125,
    currency: 'SOL',
    totalShares: 100,
    availableShares: 15,
    nextAvailable: 'Jan 10',
    monthlyRevenue: 12500,
    yearlyGrowth: 15.2,
    totalRevenue: 87500,
    occupancyRate: 78,
    avgDailyRate: 2800,
    expenses: 3200,
    netIncome: 9300,
    description: 'Luxury yacht perfect for Mediterranean cruising with state-of-the-art amenities and professional crew.',
    revenue: {
      monthly: 45000,
      yearly: 540000,
      growth: 12.5
    },
    performance: {
      totalReturn: 8.2,
      annualizedReturn: 15.4,
      volatility: 3.1
    }
  },
  {
    id: '2',
    name: 'Gulfstream G650',
    type: 'jet',
    image: '/private-jet-on-tarmac.jpg',
    location: 'Miami',
    price: 89,
    currency: 'USDC',
    totalShares: 80,
    availableShares: 22,
    nextAvailable: 'Dec 28',
    monthlyRevenue: 8900,
    yearlyGrowth: 12.8,
    totalRevenue: 62300,
    occupancyRate: 65,
    avgDailyRate: 4200,
    expenses: 2800,
    netIncome: 6100,
    description: 'Ultra-long-range business jet offering unparalleled comfort and efficiency for global travel.',
    revenue: {
      monthly: 38000,
      yearly: 456000,
      growth: 9.8
    },
    performance: {
      totalReturn: 6.7,
      annualizedReturn: 12.1,
      volatility: 4.2
    }
  },
  {
    id: '3',
    name: 'Lamborghini Huracán',
    type: 'car',
    image: '/luxury-sports-car-lamborghini.jpg',
    location: 'Los Angeles',
    price: 45,
    currency: 'USDC',
    totalShares: 50,
    availableShares: 8,
    nextAvailable: 'Dec 22',
    monthlyRevenue: 3200,
    yearlyGrowth: 18.5,
    totalRevenue: 28800,
    occupancyRate: 82,
    avgDailyRate: 850,
    expenses: 950,
    netIncome: 2250,
    description: 'High-performance supercar delivering an exhilarating driving experience with cutting-edge technology.',
    revenue: {
      monthly: 12000,
      yearly: 144000,
      growth: 15.2
    },
    performance: {
      totalReturn: 11.3,
      annualizedReturn: 18.7,
      volatility: 6.8
    }
  },
  {
    id: '4',
    name: 'Sunseeker Predator 74',
    type: 'yacht',
    image: '/luxury-yacht-deck.png',
    location: 'Ibiza',
    price: 95,
    currency: 'SOL',
    totalShares: 120,
    availableShares: 34,
    nextAvailable: 'Jan 5',
    monthlyRevenue: 9800,
    yearlyGrowth: 14.1,
    totalRevenue: 68600,
    occupancyRate: 71,
    avgDailyRate: 3100,
    expenses: 2900,
    netIncome: 6900,
    description: 'Sleek and powerful yacht designed for luxury and performance in the Mediterranean waters.',
    revenue: {
      monthly: 32000,
      yearly: 384000,
      growth: 10.7
    },
    performance: {
      totalReturn: 7.9,
      annualizedReturn: 13.8,
      volatility: 3.9
    }
  }
]