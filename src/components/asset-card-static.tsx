import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar } from "lucide-react"

interface AssetCardStaticProps {
  id: string
  name: string
  type: "real_estate" | "digital_art" | "equity" | "yacht" | "jet" | "car"
  image: string
  location: string
  price: number
  currency: "SOL" | "USDC"
  totalShares: number
  availableShares: number
  nextAvailable: string
  className?: string
}

export function AssetCardStatic({
  id,
  name,
  type,
  image,
  location,
  price,
  currency,
  totalShares,
  availableShares,
  nextAvailable,
  className,
}: AssetCardStaticProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "real_estate":
        return "bg-green-100 text-green-800"
      case "digital_art":
        return "bg-purple-100 text-purple-800"
      case "equity":
        return "bg-blue-100 text-blue-800"
      case "yacht":
        return "bg-blue-100 text-blue-800"
      case "jet":
        return "bg-purple-100 text-purple-800"
      case "car":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getTypeColor(type)}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {availableShares}/{totalShares} shares
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            {totalShares - availableShares} owners
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            Next: {nextAvailable}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">
              {price} {currency}
            </span>
            <span className="text-muted-foreground text-sm ml-1">per share</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full text-center">
          <span className="text-sm text-muted-foreground">Tokenized Asset</span>
        </div>
      </CardFooter>
    </Card>
  )
}
