"use client"

import type React from "react"

import { useState, useRef } from "react"
import { formatDistanceToNow } from "date-fns"
import { v4 as uuidv4 } from "uuid"
import { Heart, MessageCircle, MoreHorizontal, Share2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import type { Post as PostType } from "@/lib/types"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PostProps {
  post: PostType
  onDelete: (postId: string) => void
  onLike: (postId: string) => void
  onComment: (postId: string, comment: { id: string; user: string; text: string }) => void
}

export function Post({ post, onDelete, onLike, onComment }: PostProps) {
  const { user } = useAuth()
  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const commentInputRef = useRef<HTMLInputElement>(null)

  const isCurrentUserPost = post.user.id === user?.id

  const handleLike = () => {
    onLike(post.id)
  }

  const handleDelete = () => {
    onDelete(post.id)
  }

  const handleCommentClick = () => {
    setShowComments(true)
    setTimeout(() => {
      commentInputRef.current?.focus()
    }, 100)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    onComment(post.id, {
      id: uuidv4(),
      user: user?.username || "",
      text: comment,
    })

    setComment("")
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-4">
        <Avatar>
          <AvatarImage src={post.user.profilePicture} alt={post.user.username} />
          <AvatarFallback>{post.user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold">{post.user.username}</div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>
        </div>

        {isCurrentUserPost && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>

      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer">
            <div className="absolute inset-x-0 top-0 bg-background/90 p-3 text-center font-medium">{post.text}</div>
            <img src={post.image || "/placeholder.svg"} alt={post.text} className="w-full pt-12" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0">
          <img src={post.image || "/placeholder.svg"} alt={post.text} className="w-full" />
        </DialogContent>
      </Dialog>

      <CardFooter className="flex flex-col p-0">
        {/* Engagement section - redesigned to be less compact */}
        <div className="flex items-center justify-between border-t p-4">
          <div className="flex gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${post.isLiked ? "text-red-500" : ""}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current text-red-500" : ""}`} />
                    <span>{post.likes > 0 ? post.likes : ""}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{post.isLiked ? "Unlike" : "Like"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleCommentClick}>
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments.length > 0 ? post.comments.length : ""}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Comments section - redesigned to be less compact */}
        {(showComments || post.comments.length > 0) && (
          <div className="border-t px-6 py-4">
            {post.comments.length > 0 && (
              <div className="mb-4 space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  {post.comments.length} {post.comments.length === 1 ? "Comment" : "Comments"}
                </h4>
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 items-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{comment.user.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2 flex-1">
                      <div className="font-semibold text-sm">{comment.user}</div>
                      <div className="text-sm mt-1">{comment.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddComment} className="flex gap-3 mt-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
                <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  ref={commentInputRef}
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={!comment.trim()}>
                  Post
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

