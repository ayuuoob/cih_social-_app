"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function FuneralRequestPage() {
  const router = useRouter()
  const { language, addRequest } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [formData, setFormData] = useState({
    defunctFirstName: "",
    defunctLastName: "",
    cnssNumber: "",
    estimatedCost: "",
    invoice: null as File | null,
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, invoice: files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const request = {
      id: `REQ-${Date.now()}`,
      type: "funeral" as const,
      amount: Number.parseInt(formData.estimatedCost) || 5000,
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
      <h1 className="text-2xl font-bold cih-text-blue mb-2">{t("funeral.title")}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {language === "fr" ? "Fournissez les informations et les frais estimés" : "قدم المعلومات والمصاريف المتوقعة"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("funeral.defunctFirstName")}</label>
            <input
              type="text"
              name="defunctFirstName"
              value={formData.defunctFirstName}
              onChange={handleInputChange}
              className="cih-input text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("funeral.defunctLastName")}</label>
            <input
              type="text"
              name="defunctLastName"
              value={formData.defunctLastName}
              onChange={handleInputChange}
              className="cih-input text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("funeral.cnssNumber")}</label>
          <input
            type="text"
            name="cnssNumber"
            value={formData.cnssNumber}
            onChange={handleInputChange}
            className="cih-input text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("funeral.estimatedCost")}</label>
          <input
            type="number"
            name="estimatedCost"
            value={formData.estimatedCost}
            onChange={handleInputChange}
            className="cih-input text-sm"
            placeholder="5000"
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t("funeral.invoice")}</label>
          <input type="file" onChange={handleFileChange} className="text-sm" required />
          {formData.invoice && <p className="text-xs text-green-600 mt-1">✓ {formData.invoice.name}</p>}
        </div>

        <button type="submit" disabled={loading} className="cih-btn-primary w-full mt-6">
          {loading ? (language === "fr" ? "Envoi..." : "جاري...") : t("form.submit")}
        </button>
      </form>
    </div>
  )
}
