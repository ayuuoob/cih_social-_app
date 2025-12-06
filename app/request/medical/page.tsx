"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function MedicalRequestPage() {
  const router = useRouter()
  const { language, addRequest, user } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [formData, setFormData] = useState({
    fileNumber: "",
    // Other fields inferred from user context
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const request = {
      id: `REQ-${Date.now()}`,
      type: "medical" as const,
      amount: 3000,
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
      <h1 className="text-2xl font-bold cih-text-blue mb-2">{t("medical.title")}</h1>
      <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mb-6">{t("medical.description")}</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">

        {/* Pre-filled Info Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm text-gray-600 space-y-2 border border-gray-200">
          <h3 className="font-semibold text-gray-800">{language === 'fr' ? "Informations Personnelles" : "المعلومات الشخصية"}</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <p>
              <span className="block text-xs text-gray-500">{t("medical.firstName")}</span>
              <span className="font-medium">{user?.firstName}</span>
            </p>
            <p>
              <span className="block text-xs text-gray-500">{t("medical.lastName")}</span>
              <span className="font-medium">{user?.lastName}</span>
            </p>
            <p>
              <span className="block text-xs text-gray-500">{t("medical.cin")}</span>
              <span className="font-medium">{user?.cin}</span>
            </p>
            <p>
              <span className="block text-xs text-gray-500">{t("medical.cnssNumber")}</span>
              <span className="font-medium">123456789 (CNSS)</span>
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("medical.fileNumber")}</label>
          <input
            type="text"
            name="fileNumber"
            value={formData.fileNumber}
            onChange={handleInputChange}
            className="cih-input text-sm"
            placeholder="Dossier N°: 2024/..."
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {language === "fr" ? "Fichier à insérer (Photo/PDF)" : "الملف المراد إدراجه"}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <span className="text-2xl block mb-2">📎</span>
            <span className="text-sm text-gray-500">
              {language === "fr" ? "Cliquez pour ajouter des pièces jointes" : "انقر لإضافة مرفقات"}
            </span>
          </div>
        </div>

        <button type="submit" disabled={loading} className="cih-btn-primary w-full mt-6">
          {loading ? (language === "fr" ? "Envoi..." : "جاري...") : t("form.submit")}
        </button>
      </form>
    </div>
  )
}
