"use client"

import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"
import Link from "next/link"
import { useEffect } from "react"

export default function DashboardPage() {
  const { language, user, setUser, setIsAuthenticated } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  useEffect(() => {
    if (!user) {
      setUser({
        id: "1",
        firstName: "Ayoub",
        lastName: "Fakraoui",
        email: "ayoub.fakraoui@email.com",
        phone: "+212 6 12 34 56 78",
        cin: "AB123456",
        contractId: "CNT-2024-001",
        rib: "123456789012345678901234",
        situation: "active",
      })
      setIsAuthenticated(true)
    }
  }, [user, setUser, setIsAuthenticated])

  return (
    <main className="pb-20 md:pb-0">
      {/* Welcome Section */}
      <div className="cih-gradient text-white p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {language === "fr" ? "Bienvenue," : "أهلا و سهلا،"} {user?.firstName}
          </h1>
          <p className="text-blue-100">
            {language === "fr" ? "Votre filet de sécurité financière" : "شبكة الأمان المالية الخاصة بك"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* User Information Section Removed */}

        <div className="bg-gradient-to-r from-[#1F2F56] to-[#162240] rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-lg md:text-xl font-bold mb-4 opacity-90">
            {language === "fr" ? "Mon e-wallet" : "محفظتي الإلكترونية"}
          </h2>
          <div className="mb-6">
            <p className="text-sm opacity-90 mb-2">{language === "fr" ? "Solde actuel" : "الرصيد الحالي"}</p>
            <p className="text-4xl md:text-5xl font-bold mb-2">2 350,00 MAD</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/20 pt-4">
            <div>
              <p className="text-xs opacity-90 mb-1">{language === "fr" ? "ContractId" : "معرّف العقد"}</p>
              <p className="font-medium">{user?.contractId}</p>
            </div>
            <div>
              <p className="text-xs opacity-90 mb-1">{language === "fr" ? "RIB" : "الحساب البنكي"}</p>
              <p className="font-medium">{user?.rib}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {language === "fr" ? "Dernières opérations" : "آخر العمليات"}
            </h2>
            <Link href="/transactions" className="cih-text-blue text-sm font-medium hover:underline">
              {language === "fr" ? "Voir toutes" : "عرض الكل"}
            </Link>
          </div>

          <div className="space-y-3">
            {/* Transaction Item 1 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {language === "fr" ? "Micro-crédit versé" : "تم صرف القرض الصغير"}
                    </p>
                    <p className="text-xs text-gray-500">25 Nov 2024</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">+1 500,00 MAD</p>
              </div>
            </div>

            {/* Transaction Item 2 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {language === "fr" ? "Remboursement CNSS" : "تسديد CNSS"}
                    </p>
                    <p className="text-xs text-gray-500">10 Nov 2024</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">+2 800,00 MAD</p>
              </div>
            </div>

            {/* Transaction Item 3 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {language === "fr" ? "Avance décès" : "تسهيل الوفيات"}
                    </p>
                    <p className="text-xs text-gray-500">28 Oct 2024</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">+3 500,00 MAD</p>
              </div>
            </div>

            {/* Transaction Item 4 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {language === "fr" ? "Avance obsèques" : "تسهيل الجنائز"}
                    </p>
                    <p className="text-xs text-gray-500">15 Oct 2024</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">+2 000,00 MAD</p>
              </div>
            </div>

            {/* Transaction Item 5 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {language === "fr" ? "Avance salaire" : "تسهيل الراتب"}
                    </p>
                    <p className="text-xs text-gray-500">01 Oct 2024</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">+1 200,00 MAD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
