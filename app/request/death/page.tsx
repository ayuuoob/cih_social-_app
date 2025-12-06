"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function DeathRequestPage() {
  const router = useRouter()
  const { language, user, addRequest } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [formData, setFormData] = useState({
    defunctFirstName: "",
    defunctLastName: "",
    defunctCin: "",
    defunctCnss: "",
    deathDate: "",
    relationship: "spouse",
    deathCertificate: null as File | null,
    cnssAffiliation: null as File | null,
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [field]: files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const request = {
      id: `REQ-${Date.now()}`,
      type: "death" as const,
      amount: 10000,
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
      <h1 className="text-2xl font-bold cih-text-blue mb-2">{t("death.title")}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {language === "fr"
          ? "Fournissez les informations du défunt et les documents nécessaires"
          : "قدم معلومات المتوفى والمستندات المطلوبة"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("death.defunctFirstName")}</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("death.defunctLastName")}</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("death.defunctCin")}</label>
          <input
            type="text"
            name="defunctCin"
            value={formData.defunctCin}
            onChange={handleInputChange}
            className="cih-input text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("death.defunctCnss")}</label>
          <input
            type="text"
            name="defunctCnss"
            value={formData.defunctCnss}
            onChange={handleInputChange}
            className="cih-input text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("death.deathDate")}</label>
          <input
            type="date"
            name="deathDate"
            value={formData.deathDate}
            onChange={handleInputChange}
            className="cih-input text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("death.relationship")}</label>
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleInputChange}
            className="cih-input text-sm"
            required
          >
            <option value="spouse">{t("death.relationshipOptions.spouse")}</option>
            <option value="parent">{t("death.relationshipOptions.parent")}</option>
            <option value="child">{t("death.relationshipOptions.child")}</option>
            <option value="other">{t("death.relationshipOptions.other")}</option>
          </select>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t("death.deathCertificate")}</label>
          <input type="file" onChange={(e) => handleFileChange(e, "deathCertificate")} className="text-sm" required />
          {formData.deathCertificate && (
            <p className="text-xs text-green-600 mt-1">✓ {formData.deathCertificate.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t("death.cnssAffiliation")}</label>
          <input type="file" onChange={(e) => handleFileChange(e, "cnssAffiliation")} className="text-sm" required />
          {formData.cnssAffiliation && <p className="text-xs text-green-600 mt-1">✓ {formData.cnssAffiliation.name}</p>}
        </div>

        <button type="submit" disabled={loading} className="cih-btn-primary w-full mt-6">
          {loading ? (language === "fr" ? "Envoi..." : "جاري...") : t("form.submit")}
        </button>
      </form>
    </div>
  )
}
