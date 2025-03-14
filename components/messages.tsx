"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getConversations } from "@/lib/data"
import type { Conversation, Message as MessageType } from "@/lib/types"
import { useAuth } from "@/components/auth-provider"

export function Messages() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>(getConversations())
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(
    conversations.length > 0 ? conversations[0] : null,
  )
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !activeConversation) return

    const message: MessageType = {
      id: Date.now().toString(),
      senderId: user?.id || "",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    // Update the active conversation with the new message
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, message],
      lastMessage: {
        text: newMessage,
        timestamp: new Date().toISOString(),
      },
    }

    // Update the conversations list
    setConversations(conversations.map((conv) => (conv.id === activeConversation.id ? updatedConversation : conv)))

    // Update the active conversation
    setActiveConversation(updatedConversation)

    // Clear the input
    setNewMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col rounded-lg border md:flex-row">
      {/* Conversations list */}
      <div className="w-full border-b md:w-80 md:border-b-0 md:border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-1 p-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted ${
                  activeConversation?.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <Avatar>
                  <AvatarImage src={conversation.user.profilePicture} alt={conversation.user.username} />
                  <AvatarFallback>{conversation.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium">{conversation.user.username}</div>
                  <div className="truncate text-sm text-muted-foreground">{conversation.lastMessage.text}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), {
                    addSuffix: false,
                  })}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Active conversation */}
      {activeConversation ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 border-b p-4">
            <Avatar>
              <AvatarImage src={activeConversation.user.profilePicture} alt={activeConversation.user.username} />
              <AvatarFallback>{activeConversation.user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{activeConversation.user.username}</div>
              <div className="text-xs text-muted-foreground">Active {Math.floor(Math.random() * 60)} minutes ago</div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {activeConversation.messages.map((message) => {
                const isCurrentUser = message.senderId === user?.id

                return (
                  <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div>{message.text}</div>
                      <div
                        className={`mt-1 text-right text-xs ${
                          isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {formatDistanceToNow(new Date(message.timestamp), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="flex gap-2 border-t p-4">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <h3 className="text-lg font-medium">No conversation selected</h3>
          <p className="text-muted-foreground">Select a conversation from the list to start chatting</p>
        </div>
      )}
    </div>
  )
}

