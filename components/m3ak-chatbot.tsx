"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"
import { useChat } from "ai/react"

export function M3akChatbot() {
  const { language } = useAppStore()
  const t = (key: string) => getTranslation(key, language)

  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Speech Synthesis (TTS) State
  const [isMuted, setIsMuted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Web Speech API references
  const recognitionRef = useRef<any>(null)

  // Improved TTS Helper
  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return

    // Cancel any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    // Check if text contains Arabic characters with Regex
    const hasArabic = /[\u0600-\u06FF]/.test(text)

    // Better Logic for Arabic/Darija Voice Selection
    if (language === 'ar' || hasArabic) {
      // Search for ANY Arabic voice first
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.includes('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
        utterance.lang = arabicVoice.lang;
      } else {
        // Fallback
        utterance.lang = "ar-SA";
      }
      utterance.rate = 0.9;
    } else {
      utterance.lang = "fr-FR";
    }

    window.speechSynthesis.speak(utterance)
  }

  // ai/react v3 useChat returns standard helpers
  const { messages, input, setInput, append, isLoading } = useChat({
    api: "/api/chat",
    body: { language },
    onFinish: (message) => {
      // Speak the response when IT FINISHES generating
      if (!isMuted) {
        speak(message.content)
      }
    },
    onError: (error) => {
      console.error("Chat error:", error)
      const errorMessage = error.message.includes("400")
        ? "Please check your Google API Key in .env.local"
        : "Sorry, I encountered an error. Please try again."

      // Silent alert for now to avoid breaking UI flow drastically
      // alert(errorMessage)
    }
  })

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = language === "fr" ? "fr-FR" : "ar-MA"

        recognition.onstart = () => setIsListening(true)

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          // Automatically send after voice input
          setTimeout(() => {
            append({ role: "user", content: transcript })
          }, 500)
        }

        recognition.onend = () => setIsListening(false)
        recognitionRef.current = recognition
      }
    }
  }, [language, append, setInput])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    append({ role: "user", content: input })
    setInput("")
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  if (!mounted) return null

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-2xl transition-all z-30 text-white"
        style={{ backgroundColor: "#0078A8" }}
        onMouseEnter={(e) => {
          ; (e.target as HTMLElement).style.backgroundColor = "#005F87"
        }}
        onMouseLeave={(e) => {
          ; (e.target as HTMLElement).style.backgroundColor = "#0078A8"
        }}
        title="M3ak - Assistance"
      >
        💬
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-40 h-96">
      {/* Header */}
      <div
        className="p-4 rounded-t-lg flex items-center justify-between text-white"
        style={{ backgroundColor: "#0078A8" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <div>
            <h3 className="font-bold text-lg">M3ak {isMuted ? "🔇" : "🔊"}</h3>
            <p className="text-xs opacity-90">{t("chat.title")}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full w-8 h-8 flex items-center justify-center hover:opacity-80"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full w-8 h-8 flex items-center justify-center hover:opacity-80"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-10">
            {language === 'fr' ? "Je suis M3ak, comment puis-je vous aider ?" : "أنا معاك، كيف يمكنني مساعدتك؟"}
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs rounded-lg p-3 text-sm ${msg.role === "user"
                ? "text-white rounded-br-none"
                : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              style={msg.role === "user" ? { backgroundColor: "#0078A8" } : {}}
            >
              {msg.content}
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
        {/* Voice Animation Bar */}
        {isListening && (
          <div className="flex justify-center items-center gap-1 h-4 mb-2">
            <span className="w-1 h-3 bg-red-500 animate-pulse"></span>
            <span className="w-1 h-5 bg-red-500 animate-pulse delay-75"></span>
            <span className="w-1 h-3 bg-red-500 animate-pulse delay-150"></span>
            <span className="text-xs text-red-500 font-bold ml-2">Listening...</span>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="cih-input text-sm py-2"
          />
          <button
            type="button"
            onClick={toggleListening}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${isListening ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title={t("chat.voice")}
          >
            🎤
          </button>
          <button type="submit" disabled={isLoading || !input.trim()} className="cih-btn-primary px-4 py-2 text-sm flex-shrink-0 disabled:opacity-50">
            {t("chat.send")}
          </button>
        </div>
      </form>
    </div>
  )
}
