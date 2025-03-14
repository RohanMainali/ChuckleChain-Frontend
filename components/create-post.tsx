"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, X, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import type { Post } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CreatePostProps {
  onPostCreated: (post: Post) => void
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useAuth()
  const [text, setText] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (error) setError(null)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
        if (error) setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleCreatePost = async () => {
    if (!text) {
      setError("Please add a caption for your meme")
      return
    }

    if (!image) {
      setError("Please add an image for your meme")
      return
    }

    setIsCreating(true)
    setError(null)

    try {
      // In a real app, we would upload the image and create the post on the server
      // For demo purposes, we'll just create a new post object
      const newPost: Post = {
        id: uuidv4(),
        user: {
          id: user?.id || "",
          username: user?.username || "",
          profilePicture: user?.profilePicture || "",
        },
        text,
        image,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        comments: [],
      }

      onPostCreated(newPost)
      setText("")
      setImage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error creating post:", error)
      setError("Failed to create post. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt={user?.username} />
            <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={handleTextChange}
              className="min-h-[80px] resize-none border-none p-0 focus-visible:ring-0"
            />

            {image && (
              <div className="relative mt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 rounded-full bg-background/80"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <div className="absolute inset-x-0 top-0 bg-background/90 p-3 text-center font-medium">
                    {text || "Add your caption here"}
                  </div>
                  <img src={image || "/placeholder.svg"} alt="Post preview" className="rounded-md object-cover pt-12" />
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-3">
        <div>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
          <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>
        <Button onClick={handleCreatePost} disabled={isCreating}>
          {isCreating ? "Posting..." : "Post Meme"}
        </Button>
      </CardFooter>
    </Card>
  )
}

