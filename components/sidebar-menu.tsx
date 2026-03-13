"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

interface SidebarMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, setIsAuthenticated, setUser } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const menuItems = [
    { href: "/", label: language === "fr" ? "Accueil" : "الرئيسية", icon: "🏠" },
    { href: "/wallet", label: language === "fr" ? "E-wallet" : "المحفظة الإلكترونية", icon: "💳" },
    { href: "/request/death", label: t("services.death"), icon: "📄" },
    { href: "/request/funeral", label: t("services.funeral"), icon: "🤝" },
    { href: "/request/medical", label: t("services.medical"), icon: "🩺" },
    { href: "/request/microcredit", label: t("services.microcredit"), icon: "💰" },
    { href: "/request/salary", label: t("services.salary"), icon: "💳" },
    { href: "/requests", label: language === "fr" ? "Mes demandes" : "طلباتي", icon: "📁" },
    { href: "/transactions", label: language === "fr" ? "Mes transactions" : "معاملاتي", icon: "↔️" },
    { href: "/profile", label: language === "fr" ? "Mon profil" : "ملفي الشخصي", icon: "👤" },
  ]

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    onClose()
    router.push("/")
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:relative lg:translate-x-0`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {/* Logo Image */}
            <div className="w-10 h-10 relative overflow-hidden">
              <img
                src="/cih-social-logo.jpg"
                alt="CIH Social+ Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg cih-text-blue">CIH Social+</h1>
              <p className="text-xs text-gray-600">{language === "fr" ? "Sécurité financière" : "الأمان المالي"}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${isActive(item.href) ? "cih-nav-active bg-opacity-10" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          {/* Language Selector */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setLanguage("fr")}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${language === "fr" ? "cih-bg-orange text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${language === "ar" ? "cih-bg-orange text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              AR
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            {language === "fr" ? "Déconnexion" : "تسجيل الخروج"}
          </button>
        </div>
      </aside>
    </>
  )
}
