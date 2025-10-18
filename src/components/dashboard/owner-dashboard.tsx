"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Calendar, TrendingUp, CheckCircle, XCircle, Clock, Eye, Edit } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for company-owned assets
const mockAssets = [
  {
    id: "1",
    name: "Azimut Grande 35M",
    type: "Yacht",
    status: "Active",
    totalShares: 100,
    soldShares: 77,
    monthlyIncome: 12500,
    totalIncome: 87500,
    nextBooking: "Dec 15, 2024",
    acquisitionDate: "Oct 2024",
    location: "Monaco",
  },
  {
    id: "2",
    name: "Ferrari 488 GTB",
    type: "Car",
    status: "Active",
    totalShares: 50,
    soldShares: 32,
    monthlyIncome: 4200,
    totalIncome: 25200,
    nextBooking: "Dec 22, 2024",
    acquisitionDate: "Nov 2024",
    location: "Los Angeles",
  },
  {
    id: "3",
    name: "Gulfstream G650",
    type: "Private Jet",
    status: "Pending Launch",
    totalShares: 80,
    soldShares: 0,
    monthlyIncome: 0,
    totalIncome: 0,
    nextBooking: "Not scheduled",
    acquisitionDate: "Dec 2024",
    location: "Miami",
  },
]

const mockBookings = [
  {
    id: "1",
    asset: "Azimut Grande 35M",
    renter: "0x7xKX...gAsU",
    dates: "Dec 15-22, 2024",
    amount: "2.5 SOL",
    status: "pending",
  },
  {
    id: "2",
    asset: "Azimut Grande 35M",
    renter: "0x9WzD...AWWM",
    dates: "Jan 8-15, 2025",
    amount: "3.0 SOL",
    status: "approved",
  },
  {
    id: "3",
    asset: "Azimut Grande 35M",
    renter: "0x4Bm2...kL9P",
    dates: "Nov 20-27, 2024",
    amount: "2.8 SOL",
    status: "completed",
  },
]

export function OwnerDashboard() {
  const handleBookingAction = (bookingId: string, action: "approve" | "cancel") => {
    toast({
      title: `Booking ${action === "approve" ? "Approved" : "Cancelled"}`,
      description: `Booking ${bookingId} has been ${action === "approve" ? "approved" : "cancelled"}`,
    })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage company-owned luxury assets and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Company Assets</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 active, 1 launching</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,500</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares Sold</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">109/230</div>
              <p className="text-xs text-muted-foreground">47% of shares sold</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Requires approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assets">Company Assets</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>



          {/* Company Assets */}
          <TabsContent value="assets" className="space-y-6">
            <div className="grid gap-6">
              {mockAssets.map((asset) => (
                <Card key={asset.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {asset.name}
                          <Badge variant={asset.status === "Active" ? "default" : "secondary"}>{asset.status}</Badge>
                        </CardTitle>
                        <CardDescription>{asset.type}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Shares Sold</p>
                        <p className="text-lg font-semibold">
                          {asset.soldShares}/{asset.totalShares}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Income</p>
                        <p className="text-lg font-semibold">${asset.monthlyIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Income</p>
                        <p className="text-lg font-semibold">${asset.totalIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="text-lg font-semibold">{asset.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Acquired</p>
                        <p className="text-lg font-semibold">{asset.acquisitionDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>Manage booking requests for your assets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Renter</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.asset}</TableCell>
                        <TableCell className="font-mono text-sm">{booking.renter}</TableCell>
                        <TableCell>{booking.dates}</TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.status === "approved"
                                ? "default"
                                : booking.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {booking.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                            {booking.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {booking.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {booking.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleBookingAction(booking.id, "approve")}>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, "cancel")}
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Income Tracking */}
          <TabsContent value="income" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income Overview</CardTitle>
                  <CardDescription>Your earnings from asset rentals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-semibold">$12,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Month</span>
                    <span className="font-semibold">$10,800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Earnings</span>
                    <span className="font-semibold">$87,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pending Payouts</span>
                    <span className="font-semibold">$2,500</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest income from bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Yacht Rental</p>
                        <p className="text-sm text-muted-foreground">Nov 20-27</p>
                      </div>
                      <span className="font-semibold text-green-600">+$2,800</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Yacht Rental</p>
                        <p className="text-sm text-muted-foreground">Nov 10-17</p>
                      </div>
                      <span className="font-semibold text-green-600">+$3,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Share Sale</p>
                        <p className="text-sm text-muted-foreground">Nov 5</p>
                      </div>
                      <span className="font-semibold text-green-600">+$1,250</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
