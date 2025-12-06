// Mock Wallet Management Kit API integration
export interface WalletResponse {
  success: boolean
  data?: any
  error?: string
}

export interface WalletUser {
  contractId: string
  rib: string
  firstName: string
  lastName: string
  email: string
  phone: string
  cin: string
}

export interface Balance {
  contractId: string
  amount: number
  currency: string
  lastUpdated: string
}

export interface Operation {
  id: string
  type: "cash-in" | "cash-out" | "transfer"
  amount: number
  currency: string
  date: string
  status: "pending" | "completed" | "failed"
  description: string
  reference: string
}

// Mock wallet storage (in real app, this would be server-side)
const mockWallets = new Map<string, any>()
const mockOperations = new Map<string, Operation[]>()

export const walletApi = {
  // Wallet creation flow
  async precreateWallet(data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    cin: string
  }): Promise<WalletResponse> {
    const token = Math.random().toString(36).substring(7)
    return {
      success: true,
      data: {
        token,
        message: "Wallet pre-creation initiated. Check your email for OTP.",
      },
    }
  },

  async activateWallet(data: {
    otp: string
    token: string
  }): Promise<WalletResponse> {
    const contractId = `CIH-${Date.now()}`
    const rib = `${Math.random().toString().substring(2, 11)}-${Math.random().toString().substring(2, 15)}`

    mockWallets.set(contractId, {
      contractId,
      rib,
      balance: 5000, // Mock balance
      createdAt: new Date().toISOString(),
    })

    mockOperations.set(contractId, [])

    return {
      success: true,
      data: {
        contractId,
        rib,
        message: "Wallet activated successfully",
      },
    }
  },

  // Balance operations
  async getBalance(contractId: string): Promise<WalletResponse> {
    const wallet = mockWallets.get(contractId)
    if (!wallet) {
      return {
        success: false,
        error: "Wallet not found",
      }
    }

    return {
      success: true,
      data: {
        contractId,
        amount: wallet.balance,
        currency: "MAD",
        lastUpdated: new Date().toISOString(),
      },
    }
  },

  // Operations history
  async getOperations(contractId: string): Promise<WalletResponse> {
    const operations = mockOperations.get(contractId) || []
    return {
      success: true,
      data: {
        contractId,
        operations: operations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      },
    }
  },

  // Cash-in simulation and confirmation
  async simulateCashIn(data: {
    contractId: string
    amount: number
    reason: string
  }): Promise<WalletResponse> {
    return {
      success: true,
      data: {
        simulationId: `SIM-${Date.now()}`,
        amount: data.amount,
        fees: Math.round(data.amount * 0.01), // 1% fee
        total: Math.round(data.amount * 1.01),
        currency: "MAD",
        message: "Simulation completed. Please confirm to proceed.",
      },
    }
  },

  async confirmCashIn(data: {
    contractId: string
    simulationId: string
    amount: number
    reason: string
  }): Promise<WalletResponse> {
    const wallet = mockWallets.get(data.contractId)
    if (!wallet) {
      return {
        success: false,
        error: "Wallet not found",
      }
    }

    const operation: Operation = {
      id: `OP-${Date.now()}`,
      type: "cash-in",
      amount: data.amount,
      currency: "MAD",
      date: new Date().toISOString(),
      status: "completed",
      description: data.reason,
      reference: `REF-${Math.random().toString(36).substring(7).toUpperCase()}`,
    }

    wallet.balance += data.amount
    const operations = mockOperations.get(data.contractId) || []
    operations.push(operation)
    mockOperations.set(data.contractId, operations)

    return {
      success: true,
      data: {
        operationId: operation.id,
        reference: operation.reference,
        amount: data.amount,
        message: "Funds successfully transferred",
      },
    }
  },

  // Utility function to add mock transaction
  async addMockTransaction(contractId: string, operation: Operation): Promise<void> {
    const operations = mockOperations.get(contractId) || []
    operations.push(operation)
    mockOperations.set(contractId, operations)
  },
}
