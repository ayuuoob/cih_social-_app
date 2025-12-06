"use client"

import type React from "react"

import { M3akChatbot } from "@/components/m3ak-chatbot"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <M3akChatbot />
    </>
  )
}
