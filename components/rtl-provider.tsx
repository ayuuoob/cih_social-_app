"use client"

import type React from "react"

import { useEffect } from "react"
import { useAppStore } from "@/lib/app-context"

export function RTLProvider({ children }: { children: React.ReactNode }) {
  const { language } = useAppStore()

  useEffect(() => {
    const html = document.documentElement
    if (language === "ar") {
      html.setAttribute("dir", "rtl")
      html.setAttribute("lang", "ar")
    } else {
      html.setAttribute("dir", "ltr")
      html.setAttribute("lang", "fr")
    }
  }, [language])

  return <>{children}</>
}
