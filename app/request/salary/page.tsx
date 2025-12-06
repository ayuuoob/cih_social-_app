"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function SalaryRequestPage() {
  const router = useRouter()
  const { language, addRequest } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [formData, setFormData] = useState({
    amount: "",
    employer: "",
    contractType: "cdi",
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
      data: formData,
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
          ? "Fournissez vos informations d'emploi pour demander une avance"
          : "قدم معلومات التوظيف الخاصة بك لطلب سلفة"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("salary.amount")}</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="cih-input text-sm"
            placeholder="3000"
            min="500"
            max="100000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("salary.employer")}</label>
          <input
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleInputChange}
            className="cih-input text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("salary.contractType")}</label>
          <select
            name="contractType"
            value={formData.contractType}
            onChange={handleInputChange}
            className="cih-input text-sm"
            required
          >
            <option value="cdi">{t("salary.contractOptions.cdi")}</option>
            <option value="cdd">{t("salary.contractOptions.cdd")}</option>
            <option value="other">{t("salary.contractOptions.other")}</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="cih-btn-primary w-full mt-6">
          {loading ? (language === "fr" ? "Envoi..." : "جاري...") : t("form.submit")}
        </button>
      </form>
    </div>
  )
}
