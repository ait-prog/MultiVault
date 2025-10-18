import PropertyPageClient from './property-client';

// Mock property data for static generation
const mockProperties = [
  {
    id: '1',
    name: 'Azimut Grande 35M',
    type: 'yacht',
    image: '/luxury-yacht-ocean.png',
    location: 'Monaco',
    price: 125,
    currency: 'SOL',
    totalShares: 100,
    availableShares: 23,
    nextAvailable: 'Dec 15',
    monthlyRevenue: 12500,
    yearlyGrowth: 15.2,
    totalRevenue: 87500,
    occupancyRate: 78,
    avgDailyRate: 2800,
    expenses: 3200,
    netIncome: 9300
  },
  {
    id: '2',
    name: 'Gulfstream G650',
    type: 'jet',
    image: '/private-jet-on-tarmac.jpg',
    location: 'Miami',
    price: 89,
    currency: 'SOL',
    totalShares: 80,
    availableShares: 12,
    nextAvailable: 'Jan 8',
    monthlyRevenue: 8900,
    yearlyGrowth: 12.8,
    totalRevenue: 62300,
    occupancyRate: 65,
    avgDailyRate: 4200,
    expenses: 2800,
    netIncome: 6100
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
    netIncome: 2250
  },
  {
    id: '4',
    name: 'Sunseeker Predator 74',
    type: 'yacht',
    image: '/luxury-yacht-ocean.png',
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
    netIncome: 6900
  },
  {
    id: '5',
    name: 'Luxury Asset',
    type: 'yacht',
    image: '/luxury-yacht-ocean.png',
    location: 'Global',
    price: 100,
    currency: 'SOL',
    totalShares: 100,
    availableShares: 15,
    nextAvailable: 'TBD',
    monthlyRevenue: 5000,
    yearlyGrowth: 10.0,
    totalRevenue: 40000,
    occupancyRate: 70,
    avgDailyRate: 2000,
    expenses: 2000,
    netIncome: 3000
  },
  {
    id: '6',
    name: 'Luxury Asset',
    type: 'yacht',
    image: '/luxury-yacht-ocean.png',
    location: 'Global',
    price: 100,
    currency: 'SOL',
    totalShares: 100,
    availableShares: 15,
    nextAvailable: 'TBD',
    monthlyRevenue: 5000,
    yearlyGrowth: 10.0,
    totalRevenue: 40000,
    occupancyRate: 70,
    avgDailyRate: 2000,
    expenses: 2000,
    netIncome: 3000
  }
];

// Static generation removed - using dynamic rendering instead

export default async function PropertyPage(
  { params }: 
  { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <p className="text-muted-foreground">The property you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return <PropertyPageClient property={property} />;
}