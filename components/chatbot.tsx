"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  CheckCircle,
  Users,
  FileText,
  Phone,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  quickActions?: Array<{ label: string; action: string }>
}

interface ChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Section 3 compliance assistant. I can help you with compliance monitoring, worker management, contractor oversight, and HUD reporting requirements. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      quickActions: [
        { label: "Check Compliance", action: "compliance_check" },
        { label: "View Analytics", action: "view_analytics" },
        { label: "Manage Workers", action: "manage_workers" },
        { label: "Generate Report", action: "generate_report" },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
        quickActions: data.quickActions,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again or contact support.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      compliance_check: "How can I check my current compliance status?",
      view_analytics: "Show me the analytics dashboard",
      manage_workers: "I need help managing Section 3 workers",
      generate_report: "How do I generate a compliance report?",
      contact_support: "I need to contact technical support",
    }

    const message = actionMessages[action] || action
    setInputValue(message)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-2xl z-50 flex flex-col max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">Section 3 Assistant</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-white/20 h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-blue-100 mt-1">
          Hello! I'm your Section 3 compliance assistant. I can help you with compliance monitoring, worker management,
          contractor oversight, and HUD reporting requirements. What would you like to know?
        </p>
        <div className="flex items-center gap-4 mt-2 text-xs text-blue-100">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            12:58 PM
          </span>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === "bot" ? (
                      <Bot className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.quickActions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action.action)}
                          className="text-xs h-7 px-2"
                        >
                          {action.action === "compliance_check" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {action.action === "view_analytics" && <FileText className="h-3 w-3 mr-1" />}
                          {action.action === "manage_workers" && <Users className="h-3 w-3 mr-1" />}
                          {action.action === "contact_support" && <Phone className="h-3 w-3 mr-1" />}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Section 3 compliance..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Admin Mode</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}

export default Chatbot
