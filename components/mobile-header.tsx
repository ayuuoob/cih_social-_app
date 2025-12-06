"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/app-context"
import { SidebarMenu } from "./sidebar-menu"

interface MobileHeaderProps {
  title?: string
}

export function MobileHeader({ title = "CIH Care" }: MobileHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { language } = useAppStore()

  return (
    <>
      <header className="cih-header sticky top-0 z-30 px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          {/* Burger Menu */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex flex-col gap-1 lg:hidden">
            <span className="w-6 h-0.5 bg-white rounded"></span>
            <span className="w-6 h-0.5 bg-white rounded"></span>
            <span className="w-6 h-0.5 bg-white rounded"></span>
          </button>

          {/* Logo & Title */}
          <div className="flex-1 flex items-center justify-center lg:justify-start gap-2">
            <span className="text-2xl">❤️</span>
            <div>
              <h1 className="font-bold text-white text-sm">{title}</h1>
              <p className="text-xs text-blue-100">CIH Care</p>
            </div>
          </div>

          {/* Chatbot Icon */}
          <button className="text-2xl hover:opacity-80">💬</button>
        </div>
      </header>

      {/* Sidebar */}
      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
