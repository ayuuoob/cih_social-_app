"use client"

import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

// Mock transactions data
const mockTransactions = [
  {
    id: "TRX-001",
    type: "cash-in",
    date: "2024-11-25",
    description: "Micro-crédit versé",
    amount: 1500,
    currency: "MAD",
    status: "Complété",
    reference: "CIH-2024-11-25-001",
  },
  {
    id: "TRX-002",
    type: "cash-in",
    date: "2024-11-10",
    description: "Remboursement CNSS",
    amount: 2800,
    currency: "MAD",
    status: "Complété",
    reference: "CIH-2024-11-10-002",
  },
  {
    id: "TRX-003",
    type: "cash-in",
    date: "2024-10-28",
    description: "Avance décès",
    amount: 3500,
    currency: "MAD",
    status: "Complété",
    reference: "CIH-2024-10-28-003",
  },
  {
    id: "TRX-004",
    type: "cash-in",
    date: "2024-10-15",
    description: "Avance sur salaire",
    amount: 2000,
    currency: "MAD",
    status: "Complété",
    reference: "CIH-2024-10-15-004",
  },
  {
    id: "TRX-005",
    type: "cash-in",
    date: "2024-09-20",
    description: "Frais d'obsèques",
    amount: 4000,
    currency: "MAD",
    status: "Complété",
    reference: "CIH-2024-09-20-005",
  },
]

export default function TransactionsPage() {
  const { language } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  return (
    <div className="p-4 md:p-8 max-w-md lg:max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold cih-text-blue mb-6">{t("transactions.title")}</h1>

      <div className="space-y-3">
        {mockTransactions.map((op) => (
          <div key={op.id} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl">{op.type === "cash-in" ? "📥" : "📤"}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{op.description}</h3>
                  <p className="text-xs text-gray-500 mt-1">{new Date(op.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400 mt-1">{op.reference}</p>
                </div>
              </div>
              <div className="text-right whitespace-nowrap">
                <p className="font-bold text-green-600 text-sm">
                  +{op.amount} {op.currency}
                </p>
                <p className="text-xs text-gray-500 mt-1">{op.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
