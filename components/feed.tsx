"use client"

import { useState } from "react"
import { getPosts } from "@/lib/data"
import type { Post as PostType } from "@/lib/types"
import { Post } from "@/components/post"
import { CreatePost } from "@/components/create-post"

export function Feed() {
  const [posts, setPosts] = useState<PostType[]>(getPosts())

  const handleAddPost = (newPost: PostType) => {
    setPosts([newPost, ...posts])
  }

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
      <CreatePost onPostCreated={handleAddPost} />

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">No memes yet</h3>
          <p className="text-muted-foreground">Create your first meme or follow some users to see their content.</p>
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

