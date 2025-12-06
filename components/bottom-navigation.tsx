"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export function BottomNavigation() {
  const pathname = usePathname()
  const { language } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const routes = [
    { href: "/", label: t("nav.home"), icon: "🏠" },
    { href: "/requests", label: t("nav.requests"), icon: "📋" },
    { href: "/transactions", label: t("nav.transactions"), icon: "📊" },
    { href: "/profile", label: t("nav.profile"), icon: "👤" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around z-40">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors text-sm ${
            pathname === route.href ? "cih-nav-active" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span className="text-xl">{route.icon}</span>
          <span className="text-xs">{route.label}</span>
        </Link>
      ))}
    </nav>
  )
}
