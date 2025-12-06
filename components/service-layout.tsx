"use client"

import type React from "react"

import { AppHeader } from "./app-header"
import { BottomNavigation } from "./bottom-navigation"

export function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      <AppHeader />
      <main className="px-4 py-6">{children}</main>
      <BottomNavigation />
    </div>
  )
}
