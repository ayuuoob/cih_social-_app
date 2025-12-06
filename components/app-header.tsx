"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export function AppHeader() {
  const router = useRouter()
  const { language, setLanguage, user, setIsAuthenticated, setUser } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    router.push("/")
  }

  return (
    <header className="cih-header sticky top-0 z-40 px-4 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-lg">
          <div className="w-8 h-8 relative overflow-hidden bg-white rounded-full">
            <img
              src="/cih-social-logo.jpg"
              alt="CIH Social+ Logo"
              className="w-full h-full object-contain"
            />
          </div>
          CIH Social+
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2 py-1 text-sm rounded transition-colors ${language === "fr" ? "bg-white text-cih-blue" : "hover:bg-white/20 text-white"
                }`}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-1 text-sm rounded transition-colors ${language === "ar" ? "cih-bg-orange text-white" : "hover:bg-white/20 text-white"
                }`}
            >
              AR
            </button>
          </div>
          <button onClick={handleLogout} className="text-sm hover:underline text-white">
            {t("header.logout")}
          </button>
        </div>
      </div>
    </header>
  )
}
