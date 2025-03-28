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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CreatePostProps {
  onPostCreated: (post: Post) => void
}

// Categories for memes
const categories = [
  { name: "Entertainment", value: "entertainment" },
  { name: "Sports", value: "sports" },
  { name: "Gaming", value: "gaming" },
  { name: "Technology", value: "technology" },
  { name: "Fashion", value: "fashion" },
  { name: "Music", value: "music" },
  { name: "TV Shows", value: "tv" },
  { name: "Other", value: "other" },
]

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useAuth()
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [textPosition, setTextPosition] = useState<"top" | "bottom">("top")
  const [captionPlacement, setCaptionPlacement] = useState<"on-image" | "whitespace">("on-image")

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value)
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
    if (!caption) {
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
      let memeText
      if (captionPlacement === "on-image") {
        memeText = {
          id: uuidv4(),
          text: caption,
          x: 50,
          y: textPosition === "top" ? 10 : 90,
          fontSize: 32,
          fontFamily: "Impact, sans-serif",
          color: "#FFFFFF",
          backgroundColor: "transparent",
          textAlign: "center",
          bold: false,
          italic: false,
          underline: false,
          uppercase: true,
          outline: true,
        }
      }

      const newPost: Post = {
        id: uuidv4(),
        user: {
          id: user?.id || "",
          username: user?.username || "",
          profilePicture: user?.profilePicture || "",
        },
        text: caption,
        image,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        comments: [],
        category: category || undefined,
        memeTexts: captionPlacement === "on-image" ? [memeText] : undefined,
        captionPlacement: captionPlacement,
      }

      onPostCreated(newPost)
      setCaption("")
      setImage(null)
      setCategory(null)
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
              value={caption}
              onChange={handleCaptionChange}
              className="min-h-[80px] resize-none border-none p-0 focus-visible:ring-0"
            />

            {image && (
              <div className="mt-4">
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 z-10 rounded-full bg-background/80"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="relative">
                      {captionPlacement === "whitespace" ? (
                        <div className="flex flex-col overflow-hidden rounded-md">
                          <div className="bg-white p-3 text-center border-b">
                            <div
                              className="font-bold text-black uppercase tracking-wide"
                              style={{ fontFamily: "'Impact', sans-serif" }}
                            >
                              {caption || "ADD YOUR CAPTION HERE"}
                            </div>
                          </div>
                          <img
                            src={image || "/placeholder.svg?height=400&width=600"}
                            alt="Meme template"
                            className="w-full"
                          />
                        </div>
                      ) : (
                        <>
                          <img
                            src={image || "/placeholder.svg?height=400&width=600"}
                            alt="Meme template"
                            className="w-full rounded-md"
                          />
                          <div
                            className="absolute left-1/2 transform -translate-x-1/2 text-center select-none"
                            style={{
                              top: textPosition === "top" ? "10%" : "90%",
                              fontFamily: "Impact, sans-serif",
                              fontSize: "32px",
                              color: "#FFFFFF",
                              textTransform: "uppercase",
                              textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                              maxWidth: "80%",
                              wordWrap: "break-word",
                            }}
                          >
                            {caption || (textPosition === "top" ? "TOP TEXT" : "BOTTOM TEXT")}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Caption placement control */}
                  <div className="border rounded-md p-4">
                    <Label className="mb-2 block">Caption Style</Label>
                    <RadioGroup
                      value={captionPlacement}
                      onValueChange={(value) => setCaptionPlacement(value as "on-image" | "whitespace")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="on-image" id="on-image" />
                        <Label htmlFor="on-image">Overlay Text</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whitespace" id="whitespace" />
                        <Label htmlFor="whitespace">White Header</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Only show text position control when caption is on the image */}
                  {captionPlacement === "on-image" && (
                    <div className="border rounded-md p-4">
                      <Label className="mb-2 block">Text Position</Label>
                      <RadioGroup
                        value={textPosition}
                        onValueChange={(value) => setTextPosition(value as "top" | "bottom")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="top" id="top" />
                          <Label htmlFor="top">Top</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bottom" id="bottom" />
                          <Label htmlFor="bottom">Bottom</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                {/* Category selection */}
                <div className="mt-4">
                  <Label htmlFor="category">Category (optional)</Label>
                  <Select value={category || ""} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

