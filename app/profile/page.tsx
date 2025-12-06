"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function ProfilePage() {
  const router = useRouter()
  const { language, user, setUser, setIsAuthenticated } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [situation, setSituation] = useState("illness")
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    router.push("/")
    return null
  }

  const handleUpdate = () => {
    setUser({ ...user, situation })
    setIsEditing(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    router.push("/")
  }

  return (
    <div className="p-4 md:p-8 max-w-md lg:max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold cih-text-blue mb-6">{t("profile.title")}</h1>

      {/* Profile Info Card */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 mb-4">
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-1">{t("profile.firstName")}</p>
          <p className="font-semibold text-lg text-gray-900">{user.firstName}</p>
        </div>

        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-1">{t("profile.lastName")}</p>
          <p className="font-semibold text-lg text-gray-900">{user.lastName}</p>
        </div>

        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-1">{t("profile.email")}</p>
          <p className="font-semibold text-gray-900">{user.email}</p>
        </div>

        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-1">{t("profile.phone")}</p>
          <p className="font-semibold text-gray-900">{user.phone}</p>
        </div>

        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-1">{t("profile.cin")}</p>
          <p className="font-semibold text-gray-900">{user.cin}</p>
        </div>

        <div>
          <p className="text-xs text-gray-600 font-medium mb-2">{t("profile.situation")}</p>
          {isEditing ? (
            <select value={situation} onChange={(e) => setSituation(e.target.value)} className="cih-input text-sm">
              <option value="illness">{t("profile.situationOptions.illness")}</option>
              <option value="mourning">{t("profile.situationOptions.mourning")}</option>
              <option value="unemployment">{t("profile.situationOptions.unemployment")}</option>
              <option value="other">{t("profile.situationOptions.other")}</option>
            </select>
          ) : (
            <p className="font-semibold text-gray-900">
              {situation === "illness"
                ? t("profile.situationOptions.illness")
                : situation === "mourning"
                  ? t("profile.situationOptions.mourning")
                  : situation === "unemployment"
                    ? t("profile.situationOptions.unemployment")
                    : t("profile.situationOptions.other")}
            </p>
          )}
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">{t("profile.documents")}</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">📄</span>
            <span className="text-gray-700">{language === "fr" ? "Pièce d'identité" : "بطاقة الهوية"}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">📄</span>
            <span className="text-gray-700">{language === "fr" ? "Justificatif de domicile" : "إثبات العنوان"}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">📄</span>
            <span className="text-gray-700">{language === "fr" ? "Avis d'imposition" : "الإقرار الضريبي"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mb-4">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="cih-btn-primary w-full">
              {t("form.save")}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors w-full"
            >
              {t("form.cancel")}
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="cih-btn-primary w-full">
            {t("profile.update")}
          </button>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-100 text-red-600 px-4 py-3 rounded-lg font-medium hover:bg-red-200 transition-colors"
      >
        {t("profile.logout")}
      </button>
    </div>
  )
}
