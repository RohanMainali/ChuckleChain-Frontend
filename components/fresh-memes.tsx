"use client"

import { useState } from "react"
import { getFreshPosts } from "@/lib/data"
import type { Post as PostType } from "@/lib/types"
import { Post } from "@/components/post"

export function FreshMemes() {
  const [posts, setPosts] = useState<PostType[]>(getFreshPosts())

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId: string, comment: { id: string; user: string; text: string }) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold mb-6">Fresh Memes</h1>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">No fresh memes yet</h3>
          <p className="text-muted-foreground">Be the first to post a fresh meme!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={handleDeletePost}
              onLike={handleLikePost}
              onComment={handleAddComment}
            />
          ))}
        </div>
      )}
    </div>
  )
}

