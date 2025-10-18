import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import { PROGRAM_ID, connection } from './solana-config'

// Simple IDL for now
const simpleIdl = {
  version: "0.1.0",
  name: "multivault",
  address: "EF9CQ7WfxzUmTpmQxhMv9WFCJoLkyTKniXdDYXaUg5Kh",
  metadata: {
    spec: "0.1.0",
    name: "multivault",
    version: "0.1.0",
    description: "MultiVault - Blockchain platform for asset tokenization"
  },
  instructions: [],
  accounts: [],
  events: [],
  errors: []
}

// Program types
export type MultiVaultProgram = Program<typeof simpleIdl>

// Program singleton
let program: MultiVaultProgram | null = null

export const getProgram = (wallet?: Wallet): MultiVaultProgram => {
  if (!program) {
    if (!wallet) {
      throw new Error('Wallet is required to initialize program')
    }

    const provider = new AnchorProvider(
      connection,
      wallet,
      { commitment: 'confirmed' }
    )

    program = new Program(simpleIdl as any, provider as any)
  }

  return program
}

// Function to create program with new provider
export const createProgram = (wallet: Wallet): MultiVaultProgram => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    { commitment: 'confirmed' }
  )

  return new Program(simpleIdl as any, provider as any)
}

// Reset program (for reconnection)
export const resetProgram = () => {
  program = null
}

// Export IDL for use in other places
export { simpleIdl as idl }
