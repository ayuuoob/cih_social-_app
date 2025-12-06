"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"
import { walletApi, type Balance, type Operation } from "@/lib/wallet-api"
import { AppHeader } from "@/components/app-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { language, user, isAuthenticated } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [balance, setBalance] = useState<Balance | null>(null)
  const [operations, setOperations] = useState<Operation[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<"Standard" | "Prioritaire" | "Fragilité élevée">("Standard")

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/")
      return
    }

    // Fetch wallet balance
    const fetchBalance = async () => {
      const result = await walletApi.getBalance(user.contractId)
      if (result.success) {
        setBalance(result.data)
      }
    }

    // Fetch operations
    const fetchOperations = async () => {
      const result = await walletApi.getOperations(user.contractId)
      if (result.success) {
        setOperations(result.data.operations.slice(0, 5))
      }
    }

    fetchBalance()
    fetchOperations()
    setLoading(false)
    setStatus(["Standard", "Prioritaire", "Fragilité élevée"][Math.floor(Math.random() * 3)] as any)
  }, [isAuthenticated, user, router])

  const services = [
    { id: "death", title: t("services.death"), href: "/request/death", icon: "⚰️", color: "bg-red-50" },
    { id: "funeral", title: t("services.funeral"), href: "/request/funeral", icon: "🕯️", color: "bg-purple-50" },
    { id: "medical", title: t("services.medical"), href: "/request/medical", icon: "🏥", color: "bg-blue-50" },
    {
      id: "microcredit",
      title: t("services.microcredit"),
      href: "/request/microcredit",
      icon: "💳",
      color: "bg-green-50",
    },
    { id: "salary", title: t("services.salary"), href: "/request/salary", icon: "💼", color: "bg-yellow-50" },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      <AppHeader />

      <main className="px-4 py-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#0078A8] to-[#005F87] text-white rounded-2xl p-6 mb-6 shadow-lg">
          <p className="text-sm opacity-90">{t("dashboard.balance")}</p>
          <h2 className="text-4xl font-bold my-2">{balance?.amount || 0} MAD</h2>
          <p className="text-xs opacity-75">RIB: {user?.rib}</p>
        </div>

        {/* Status Badge */}
        <div className="mb-6 flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">{t("dashboard.status")}:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
              status === "Standard" ? "bg-blue-500" : status === "Prioritaire" ? "bg-orange-500" : "bg-red-500"
            }`}
          >
            {status === "Standard"
              ? t("dashboard.statusStandard")
              : status === "Prioritaire"
                ? t("dashboard.statusPriority")
                : t("dashboard.statusHighVulnerability")}
          </span>
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#333333] mb-4">{t("dashboard.availableServices")}</h3>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className={`${service.color} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow`}
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">{service.title}</h4>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h3 className="text-lg font-bold text-[#333333] mb-4">{t("dashboard.recentTransactions")}</h3>
          {operations.length > 0 ? (
            <div className="space-y-3">
              {operations.map((op) => (
                <div
                  key={op.id}
                  className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm text-gray-800">{op.description}</p>
                    <p className="text-xs text-gray-500">{new Date(op.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${op.type === "cash-in" ? "text-green-600" : "text-red-600"}`}>
                      {op.type === "cash-in" ? "+" : "-"} {op.amount} MAD
                    </p>
                    <p className="text-xs text-gray-500">{op.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">
              {language === "fr" ? "Aucune transaction pour le moment" : "لا توجد معاملات في الوقت الحالي"}
            </p>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
