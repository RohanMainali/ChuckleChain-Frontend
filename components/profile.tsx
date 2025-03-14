"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Grid3X3, Settings } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Post } from "@/components/post"
import { EditProfileDialog } from "@/components/edit-profile-dialog"
import type { UserProfile, Post as PostType } from "@/lib/types"

interface ProfileProps {
  profile: UserProfile
}

export function Profile({ profile }: ProfileProps) {
  const { user } = useAuth()
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing)
  const [followerCount, setFollowerCount] = useState(profile.followers)
  const [posts, setPosts] = useState<PostType[]>(profile.posts)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  const isCurrentUser = user?.id === profile.id

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1)
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

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    // In a real app, we would update the profile on the server
    console.log("Profile updated:", updatedProfile)
    setIsEditProfileOpen(false)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={profile.profilePicture} alt={profile.username} />
              <AvatarFallback className="text-2xl">{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-2xl font-bold">{profile.username}</h1>

                {isCurrentUser ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditProfileOpen(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollow}>
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </div>

              <div className="mt-4 flex gap-6">
                <div className="text-center">
                  <div className="font-bold">{posts.length}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{followerCount}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{profile.following}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="font-bold">{profile.fullName}</div>
                <p className="mt-1 max-w-md">{profile.bio}</p>
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-primary hover:underline"
                  >
                    {profile.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Posts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="text-muted-foreground">
                {isCurrentUser
                  ? "Create your first meme to get started."
                  : `${profile.username} hasn't posted any memes yet.`}
              </p>
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
        </TabsContent>
      </Tabs>

      <EditProfileDialog
        profile={profile}
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        onUpdate={handleProfileUpdate}
      />
    </div>
  )
}

