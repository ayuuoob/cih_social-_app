"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"
import { walletApi } from "@/lib/wallet-api"

export default function SignupPage() {
  const router = useRouter()
  const { language, setIsAuthenticated, setUser } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cin: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<"form" | "otp">("form")
  const [token, setToken] = useState("")
  const [otp, setOtp] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError(language === "fr" ? "Les mots de passe ne correspondent pas" : "كلمات المرور غير متطابقة")
      setLoading(false)
      return
    }

    // Precreate wallet
    const result = await walletApi.precreateWallet({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      cin: formData.cin,
    })

    if (result.success) {
      setToken(result.data.token)
      setStep("otp")
    } else {
      setError(result.error || "Error creating account")
    }
    setLoading(false)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Activate wallet
    const result = await walletApi.activateWallet({
      otp,
      token,
    })

    if (result.success) {
      const user = {
        id: "1",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        cin: formData.cin,
        contractId: result.data.contractId,
        rib: result.data.rib,
      }
      setIsAuthenticated(true)
      setUser(user)
      router.push("/dashboard")
    } else {
      setError(result.error || "Error activating wallet")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white flex flex-col items-center justify-center px-4 py-8">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-[#0078A8] font-medium hover:underline">
          ← {language === "fr" ? "Retour" : "عودة"}
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0078A8] mb-2">{t("auth.signup")}</h1>
          <p className="text-gray-600">{t("auth.haveAccount")}</p>
          <Link href="/login" className="text-[#F58220] font-semibold hover:underline">
            {t("auth.login")}
          </Link>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded-lg shadow-md">
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.firstName")}</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="cih-input text-sm py-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.lastName")}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="cih-input text-sm py-1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.cin")}</label>
              <input
                type="text"
                name="cin"
                value={formData.cin}
                onChange={handleInputChange}
                className="cih-input text-sm py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="cih-input text-sm py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.phone")}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="cih-input text-sm py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.password")}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="cih-input text-sm py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.confirmPassword")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="cih-input text-sm py-1"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="cih-btn-primary w-full">
              {loading ? (language === "fr" ? "Création..." : "جاري...") : t("auth.signup")}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

            <div className="text-center mb-4">
              <p className="text-gray-600 text-sm">
                {language === "fr" ? "Un code a été envoyé à votre email" : "تم إرسال رمز إلى بريدك الإلكتروني"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "fr" ? "Code OTP" : "رمز OTP"}
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="cih-input"
                placeholder="000000"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="cih-btn-secondary w-full">
              {loading
                ? language === "fr"
                  ? "Vérification..."
                  : "جاري..."
                : language === "fr"
                  ? "Vérifier"
                  : "التحقق"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
