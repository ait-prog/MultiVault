"use client"

import { Footer } from "@/components/footer"
import { AssetCardStatic } from "@/components/asset-card-static"
import { LiveStats } from "@/components/live-stats"
import { RecentTransactions } from "@/components/recent-transactions"
import { TrendingAssets } from "@/components/trending-assets"
import { SolanaNetworkStatus } from "@/components/solana-network-status"
// import { TestIntegration } from "@/components/test-integration"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, TrendingUp, Anchor, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for MultiVault assets
const featuredAssets = [
  {
    id: "1",
    name: "Real Estate Portfolio",
    type: "real_estate" as const,
    image: "/placeholder.svg",
    location: "Global",
    price: 250,
    currency: "USDC" as const,
    totalShares: 1000,
    availableShares: 150,
    nextAvailable: "Dec 15",
    description: "Diversified real estate portfolio across major cities"
  },
  {
    id: "2",
    name: "Digital Art Collection",
    type: "digital_art" as const,
    image: "/placeholder.svg",
    location: "Metaverse",
    price: 89,
    currency: "SOL" as const,
    totalShares: 500,
    availableShares: 75,
    nextAvailable: "Jan 8",
    description: "Curated collection of premium digital artworks"
  },
  {
    id: "3",
    name: "Tech Startup Equity",
    type: "equity" as const,
    image: "/placeholder.svg",
    location: "Silicon Valley",
    price: 45,
    currency: "USDC" as const,
    totalShares: 200,
    availableShares: 25,
    nextAvailable: "Dec 22",
    description: "Early-stage technology startup investments"
  },
]

// Mock blog posts
const blogPosts = [
  {
    id: "1",
    title: "Solana Blockchain: The Future of Asset Tokenization",
    excerpt: "Discover how Solana's high-speed, low-cost blockchain is revolutionizing asset tokenization and fractional ownership.",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Building on Solana: Smart Contracts for Asset Management",
    excerpt: "Learn how to create and deploy smart contracts on Solana for managing tokenized assets and fractional ownership.",
    date: "Dec 8, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Tokenization Strategies: From Real Estate to Digital Assets",
    excerpt: "Explore different tokenization strategies and how to choose the right approach for your assets on Solana.",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    image: "/placeholder.svg",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">Powered by Solana Blockchain</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">
                  Transform Assets into <span className="text-primary">Tradeable Tokens</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                  MultiVault is a blockchain platform that converts real and digital assets into tradeable tokens, enabling fractional ownership and global liquidity for diverse investment opportunities.
                </p>
              </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <WalletConnectModal />
          <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            View Smart Contracts
          </Button>
        </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Smart Contract Secured
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  5,000+ Token Holders
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  $100M+ Tokenized Assets
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏢</div>
                      <div className="text-sm text-primary font-medium">Real Estate</div>
                    </div>
                  </div>
                  <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎨</div>
                      <div className="text-sm text-primary font-medium">Digital Art</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">💼</div>
                      <div className="text-sm text-primary font-medium">Equity</div>
                    </div>
                  </div>
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">⚡</div>
                      <div className="text-sm text-primary font-medium">Smart Contracts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">How MultiVault Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A step-by-step process to transform your assets into tradeable tokens
            </p>
          </div>

          {/* Process Flow */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Asset Selection</h3>
                <p className="text-sm text-muted-foreground">Choose your real estate, art, or digital asset to tokenize</p>
                {/* Arrow */}
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary/20 transform translate-x-4"></div>
                <div className="hidden md:block absolute top-8 left-full w-0 h-0 border-l-4 border-l-primary/20 border-t-2 border-b-2 border-t-transparent border-b-transparent transform translate-x-4"></div>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Legal & Valuation</h3>
                <p className="text-sm text-muted-foreground">Professional valuation and legal compliance verification</p>
                {/* Arrow */}
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary/20 transform translate-x-4"></div>
                <div className="hidden md:block absolute top-8 left-full w-0 h-0 border-l-4 border-l-primary/20 border-t-2 border-b-2 border-t-transparent border-b-transparent transform translate-x-4"></div>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Smart Contract</h3>
                <p className="text-sm text-muted-foreground">Deploy smart contract on Solana blockchain</p>
                {/* Arrow */}
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary/20 transform translate-x-4"></div>
                <div className="hidden md:block absolute top-8 left-full w-0 h-0 border-l-4 border-l-primary/20 border-t-2 border-b-2 border-t-transparent border-b-transparent transform translate-x-4"></div>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">4. Token Launch</h3>
                <p className="text-sm text-muted-foreground">Launch tokens and enable global trading</p>
              </div>
            </div>

            {/* Solana Integration */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-4 bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Powered by Solana</h4>
                  <p className="text-sm text-muted-foreground">Fast, secure, and cost-effective blockchain infrastructure</p>
                </div>
                <div className="flex gap-2">
                  <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Assets Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Tokenize Your Assets</h2>
        <p className="text-xl text-muted-foreground">
          Transform your real and digital assets into tradeable tokens with fractional ownership
        </p>
            </div>
            <Button variant="outline" className="bg-transparent">
              View All Assets
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAssets.map((asset) => (
              <AssetCardStatic key={asset.id} {...asset} />
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Live Platform Statistics</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Real-time data from the MultiVault platform
            </p>
          </div>

          <LiveStats className="mb-16" />

          <div className="grid md:grid-cols-3 gap-8">
            <RecentTransactions />
            <TrendingAssets />
            <SolanaNetworkStatus />
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Latest Insights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Stay updated with the latest trends in asset tokenization and blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/blog/${post.id}`} className="text-primary hover:underline font-medium">
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Integration Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Test Integration</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Test the connection between frontend and Solana program
            </p>
          </div>
          
          <div className="flex justify-center">
            {/* <TestIntegration /> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
