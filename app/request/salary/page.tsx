"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function SalaryRequestPage() {
  const router = useRouter()
  const { language, addRequest, user } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [formData, setFormData] = useState({
    amount: "",
    employer: "Orange Business", // Pre-filled
    contractType: "cdi", // Pre-filled
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const request = {
      id: `REQ-${Date.now()}`,
      type: "salary" as const,
      amount: Number.parseInt(formData.amount) || 3000,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      data: {
        ...formData,
        user: user // Attach user info context
      },
    }

    addRequest(request)
    router.push("/requests")
    setLoading(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-md lg:max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold cih-text-blue mb-2">{t("salary.title")}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {language === "fr"
          ? "Remplissez le montant souhaité. Vos informations sont déjà pré-remplies."
          : "أدخل المبلغ المطلوب. معلوماتك معبأة مسبقًا."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm text-gray-600 space-y-2 border border-gray-200">
          <h3 className="font-semibold text-gray-800">{language === 'fr' ? "Informations Employé" : "معلومات الموظف"}</h3>
          <p className="flex justify-between">
            <span>{t("salary.employer")}:</span>
            <span className="font-medium text-gray-900">Orange Business</span>
          </p>
          <p className="flex justify-between">
            <span>{t("salary.contractType")}:</span>
            <span className="font-medium text-gray-900">{t("salary.contractOptions.cdi")}</span>
          </p>
          <p className="flex justify-between">
            <span>RIB:</span>
            <span className="font-medium text-gray-900 font-mono">{user?.rib || "123..."}</span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("salary.amount")} (MAD)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="cih-input text-lg font-bold text-blue-600"
            placeholder="Ex: 5000"
            min="500"
            max="100000"
            required
            autoFocus
          />
        </div>

        <button type="submit" disabled={loading} className="cih-btn-primary w-full mt-6">
          {loading ? (language === "fr" ? "Envoi..." : "جاري...") : t("form.submit")}
        </button>
      </form>
    </div>
  )
}
