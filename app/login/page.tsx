"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function LoginPage() {
  const router = useRouter()
  const { language, setIsAuthenticated, setUser } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Mock authentication
    setTimeout(() => {
      if (email && password) {
        const user = {
          id: "1",
          firstName: "Ahmed",
          lastName: "Alami",
          email,
          phone: "212612345678",
          cin: "AB123456",
          contractId: `CIH-${Date.now()}`,
          rib: "1234567890123456789",
        }
        setIsAuthenticated(true)
        setUser(user)
        router.push("/dashboard")
      } else {
        setError(t("auth.loginError"))
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white flex flex-col items-center justify-center px-4">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-[#0078A8] font-medium hover:underline">
          ← {language === "fr" ? "Retour" : "عودة"}
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0078A8] mb-2">{t("auth.login")}</h1>
          <p className="text-gray-600">{t("auth.noAccount")}</p>
          <Link href="/signup" className="text-[#F58220] font-semibold hover:underline">
            {t("auth.signup")}
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cih-input"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cih-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="cih-btn-primary w-full">
            {loading ? (language === "fr" ? "Connexion..." : "جاري...") : t("auth.login")}
          </button>
        </form>
      </div>
    </div>
  )
}
