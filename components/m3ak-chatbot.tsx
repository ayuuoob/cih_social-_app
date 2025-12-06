"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"
import { getChatbotResponse, getDefaultResponse } from "@/lib/chatbot-responses"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  text: string
  timestamp: Date
}

export function M3akChatbot() {
  const { language } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: ChatMessage = {
        id: "welcome",
        type: "bot",
        text: getDefaultResponse(language),
        timestamp: new Date(),
      }
      setMessages([welcome])
    }
  }, [isOpen, messages.length, language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: getChatbotResponse(input, language),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 500)
  }

  const handleVoiceMode = () => {
    const voiceMessage =
      language === "fr"
        ? "Mode vocal activé - Simule une entrée vocale"
        : "تم تفعيل الوضع الصوتي - محاكاة المدخل الصوتي"
    setInput(voiceMessage)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-2xl transition-all z-30 text-white"
        style={{ backgroundColor: "#0078A8" }}
        onMouseEnter={(e) => {
          ;(e.target as HTMLElement).style.backgroundColor = "#005F87"
        }}
        onMouseLeave={(e) => {
          ;(e.target as HTMLElement).style.backgroundColor = "#0078A8"
        }}
        title="M3ak - Assistance"
      >
        💬
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-40 max-h-96">
      {/* Header */}
      <div
        className="p-4 rounded-t-lg flex items-center justify-between text-white"
        style={{ backgroundColor: "#0078A8" }}
      >
        <div>
          <h3 className="font-bold text-lg">M3ak</h3>
          <p className="text-xs opacity-90">{t("chat.title")}</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full w-8 h-8 flex items-center justify-center hover:opacity-80"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs rounded-lg p-3 text-sm ${
                msg.type === "user"
                  ? "text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
              }`}
              style={msg.type === "user" ? { backgroundColor: "#0078A8" } : {}}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 space-y-2 bg-white rounded-b-lg">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleVoiceMode}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm flex-1 transition-colors"
            title={t("chat.voice")}
          >
            🎤 {language === "fr" ? "Vocal" : "صوت"}
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="cih-input text-sm py-2"
          />
          <button type="submit" className="cih-btn-primary px-4 py-2 text-sm flex-shrink-0">
            {t("chat.send")}
          </button>
        </div>
      </form>
    </div>
  )
}
