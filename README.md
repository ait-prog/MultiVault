# 🏛️ MultiVault - Blockchain Asset Tokenization Platform

<div align="center">

![MultiVault Logo](public/favicon.svg)

**🏆 Colosseum Hackathon Submission**

*Transform real and digital assets into tradeable tokens with fractional ownership and global liquidity*

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Powered by Solana](https://img.shields.io/badge/Powered%20by-Solana-9945FF?style=for-the-badge&logo=solana)](https://solana.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## 🎯 Project Overview

**MultiVault** is a revolutionary blockchain platform that transforms real and digital assets into tradeable tokens, enabling fractional ownership and global liquidity. Built on Solana blockchain, it democratizes access to high-value assets through smart contracts and decentralized technology.

### 🌟 Key Features

- **🔗 Asset Tokenization**: Convert real estate, digital art, equity, and other assets into tradeable tokens
- **📊 Fractional Ownership**: Divide high-value assets into affordable shares
- **🌍 Global Liquidity**: Trade tokenized assets 24/7 on a global marketplace
- **⚡ Solana Integration**: Fast, secure, and cost-effective blockchain infrastructure
- **📈 Live Dashboard**: Real-time statistics and transaction monitoring
- **🔒 Smart Contracts**: Secure asset management with full transparency

## 🚀 Demo

### Live Platform Statistics
- **Real-time Updates**: Live statistics dashboard with automatic updates
- **Transaction Tracking**: Recent transactions with status indicators
- **Trending Assets**: Top-performing assets with 24h changes
- **Network Status**: Solana network health monitoring

### Asset Types Supported
- 🏢 **Real Estate**: Commercial and residential properties
- 🎨 **Digital Art**: NFTs and digital collectibles
- 📈 **Equity**: Startup and company shares
- 🚁 **Luxury Assets**: Yachts, jets, and high-value items

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library

### Blockchain
- **Solana** - High-performance blockchain
- **Anchor Framework** - Solana program development
- **SPL Tokens** - Token standards
- **Wallet Adapter** - Multi-wallet support

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/ait-prog/MultiVault.git
cd MultiVault
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
multivault/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── portfolio/         # Portfolio dashboard
│   │   ├── contracts/         # Smart contracts page
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── live-stats.tsx    # Live statistics
│   │   ├── recent-transactions.tsx
│   │   ├── trending-assets.tsx
│   │   └── solana-network-status.tsx
│   ├── lib/                   # Utilities and hooks
│   │   ├── solana-config.ts  # Solana configuration
│   │   ├── solana-hooks.ts   # Solana hooks
│   │   └── types.ts          # TypeScript types
│   └── contexts/             # React contexts
├── public/                    # Static assets
│   ├── favicon.svg           # App icon
│   └── idl/                  # Smart contract IDL
└── README.md                 # This file
```

## 🔧 Smart Contract

### Program ID
```
EF9CQ7WfxzUmTpmQxhMv9WFCJoLkyTKniXdDYXaUg5Kh
```

### Key Instructions
- `init_asset` - Initialize new asset
- `mint_shares` - Mint asset shares
- `stake` - Stake assets for rewards
- `unstake` - Unstake assets
- `update_price` - Update asset price
- `rent` - Rent asset for specified period

### Account Structures
- **Asset**: Asset metadata and pricing
- **UserPosition**: User's stake and rewards
- **PriceUpdater**: Authorized price updaters

## 🎨 UI Components

### Live Statistics
- Real-time platform metrics
- Automatic updates every 2 seconds
- Total value, users, assets, and volume

### Recent Transactions
- Transaction history with status
- Buy, sell, stake, and unstake operations
- Visual status indicators

### Trending Assets
- Top-performing assets
- 24-hour price changes
- Volume and market cap data

### Solana Network Status
- Network health monitoring
- TPS, block height, and slot time
- Real-time network statistics

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Submission

### Colosseum Hackathon 2024
- **Track**: Infrastructure & Tooling
- **Category**: DeFi & Asset Management
- **Focus**: Solana Ecosystem

### Submission Highlights
- ✅ **Complete Platform**: Full-stack blockchain application
- ✅ **Solana Integration**: Native Solana program support
- ✅ **Real-time Features**: Live statistics and monitoring
- ✅ **Modern UI/UX**: Responsive design with animations
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Production Ready**: Optimized for deployment

## 📞 Contact

- **GitHub**: [@ait-prog](https://github.com/ait-prog)
- **Repository**: [MultiVault](https://github.com/ait-prog/MultiVault)

## 🙏 Acknowledgments

- **Solana Foundation** for the amazing blockchain infrastructure
- **Next.js Team** for the excellent React framework
- **shadcn/ui** for the beautiful component library
- **Colosseum** for organizing this incredible hackathon

---

<div align="center">

**Built with ❤️ for the Solana ecosystem**

*MultiVault - Democratizing access to high-value assets through blockchain technology*

</div>
