// Global app context and state management
import { create } from "zustand"

export type Language = "fr" | "ar"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  cin: string
  contractId: string
  rib: string
  situation?: string
}

export interface FinancialRequest {
  id: string
  type: "death" | "funeral" | "medical" | "microcredit" | "salary"
  amount: number
  status: "pending" | "accepted" | "rejected" | "paid"
  createdAt: string
  data: Record<string, any>
}

export interface AppStore {
  language: Language
  setLanguage: (lang: Language) => void
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  requests: FinancialRequest[]
  addRequest: (request: FinancialRequest) => void
  updateRequest: (id: string, updates: Partial<FinancialRequest>) => void
  removeRequest: (id: string) => void
}

export const useAppStore = create<AppStore>((set) => ({
  language: "fr",
  setLanguage: (lang) => set({ language: lang }),
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  requests: [],
  addRequest: (request) => set((state) => ({ requests: [...state.requests, request] })),
  updateRequest: (id, updates) =>
    set((state) => ({
      requests: state.requests.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),
  removeRequest: (id) =>
    set((state) => ({
      requests: state.requests.filter((r) => r.id !== id),
    })),
}))
