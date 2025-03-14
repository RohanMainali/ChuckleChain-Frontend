"use client"

import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getNotifications } from "@/lib/data"
import type { Notification } from "@/lib/types"
import { Heart, MessageCircle, UserPlus } from "lucide-react"

export function Notifications() {
  const notifications = getNotifications()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "like":
        return (
          <>
            <span className="font-semibold">{notification.user.username}</span> liked your meme
          </>
        )
      case "comment":
        return (
          <>
            <span className="font-semibold">{notification.user.username}</span> commented on your meme: "
            {notification.content}"
          </>
        )
      case "follow":
        return (
          <>
            <span className="font-semibold">{notification.user.username}</span> started following you
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Notifications</h1>

      <Card>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <h3 className="text-lg font-medium">No notifications yet</h3>
                <p className="text-muted-foreground">When you get notifications, they'll appear here</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 hover:bg-muted/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.user.profilePicture} alt={notification.user.username} />
                          <AvatarFallback>{notification.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <p>{getNotificationText(notification)}</p>
                      </div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.timestamp), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>

                    {notification.type === "follow" && (
                      <Button variant="outline" size="sm">
                        Follow Back
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
}

