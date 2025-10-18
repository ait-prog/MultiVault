'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MapPin, Users, TrendingUp, DollarSign, BarChart3, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

interface Property {
  id: string;
  name: string;
  type: string;
  image: string;
  location: string;
  price: number;
  currency: string;
  totalShares: number;
  availableShares: number;
  nextAvailable: string;
  monthlyRevenue: number;
  yearlyGrowth: number;
  totalRevenue: number;
  occupancyRate: number;
  avgDailyRate: number;
  expenses: number;
  netIncome: number;
}

interface PropertyPageClientProps {
  property: Property;
}

function PropertyPageClient({ property }: PropertyPageClientProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [shares, setShares] = useState(1);
  const { user, addToPortfolio } = useAppStore();

  const handleInvest = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to invest in properties.",
        variant: "destructive",
      });
      return;
    }

    addToPortfolio({
      id: property.id,
      name: property.name,
      shares: shares,
      value: property.price * shares,
      type: property.type
    });

    toast({
      title: "Investment Successful!",
      description: `You've invested ${shares} shares in ${property.name}`,
    });
  };

  const profitMargin = property.netIncome && property.totalRevenue 
    ? ((property.netIncome / property.totalRevenue) * 100).toFixed(1)
    : '0';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Image and Basic Info */}
        <div className="lg:col-span-2">
          <div className="relative h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{property.name}</h1>
              <Badge variant="secondary" className="capitalize">
                {property.type}
              </Badge>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              {property.location}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {property.price} {property.currency}
                </div>
                <div className="text-sm text-gray-600">Price per share</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{property.availableShares}</div>
                <div className="text-sm text-gray-600">Available shares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{property.totalShares}</div>
                <div className="text-sm text-gray-600">Total shares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{property.nextAvailable}</div>
                <div className="text-sm text-gray-600">Next available</div>
              </div>
            </div>

            <Progress 
              value={((property.totalShares - property.availableShares) / property.totalShares) * 100} 
              className="mb-2" 
            />
            <div className="text-sm text-gray-600">
              {Math.round(((property.totalShares - property.availableShares) / property.totalShares) * 100)}% funded
            </div>
          </div>

          {/* Tabs for detailed information */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Overview</CardTitle>
                  <CardDescription>
                    Key information about this luxury asset
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Asset Details</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Type:</strong> {property.type}</li>
                        <li><strong>Location:</strong> {property.location}</li>
                        <li><strong>Total Shares:</strong> {property.totalShares}</li>
                        <li><strong>Available:</strong> {property.availableShares}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Investment Info</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Price per Share:</strong> {property.price} {property.currency}</li>
                        <li><strong>Next Available:</strong> {property.nextAvailable}</li>
                        <li><strong>Minimum Investment:</strong> 1 share</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financials" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Revenue Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Monthly Revenue:</span>
                        <span className="font-semibold">${property.monthlyRevenue?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-semibold">${property.totalRevenue?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Yearly Growth:</span>
                        <span className="font-semibold text-green-600">
                          {property.yearlyGrowth || 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Profitability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Net Income:</span>
                        <span className="font-semibold text-green-600">
                          ${property.netIncome?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expenses:</span>
                        <span className="font-semibold text-red-600">
                          ${property.expenses?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit Margin:</span>
                        <span className="font-semibold">{profitMargin}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Occupancy Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Occupancy Rate:</span>
                          <span className="font-semibold">{property.occupancyRate || 0}%</span>
                        </div>
                        <Progress value={property.occupancyRate || 0} />
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Daily Rate:</span>
                        <span className="font-semibold">${property.avgDailyRate?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Growth Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Yearly Growth:</span>
                        <div className="flex items-center">
                          {(property.yearlyGrowth || 0) > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={`font-semibold ${
                            (property.yearlyGrowth || 0) > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {property.yearlyGrowth || 0}%
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Based on historical performance data
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Investment Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Invest Now
              </CardTitle>
              <CardDescription>
                Purchase shares in this luxury asset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of shares
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShares(Math.max(1, shares - 1))}
                      disabled={shares <= 1}
                    >
                      -
                    </Button>
                    <span className="flex-1 text-center font-semibold">
                      {shares}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShares(Math.min(property.availableShares, shares + 1))}
                      disabled={shares >= property.availableShares}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Price per share:</span>
                    <span>{property.price} {property.currency}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total investment:</span>
                    <span className="font-semibold">
                      {property.price * shares} {property.currency}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={handleInvest} 
                  className="w-full"
                  disabled={!user || property.availableShares === 0}
                >
                  {!user ? 'Sign in to invest' : 
                   property.availableShares === 0 ? 'Sold out' : 
                   'Invest now'}
                </Button>

                {!user && (
                  <p className="text-sm text-gray-600 text-center">
                    <Link href="/auth" className="text-blue-600 hover:underline">
                      Create an account
                    </Link> to start investing
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PropertyPageClient;