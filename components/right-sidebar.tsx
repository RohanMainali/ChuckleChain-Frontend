"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import { Award, Flame, TrendingUp, Trophy, Users } from "lucide-react"
import { getUserProfile } from "@/lib/data"

// Badge definitions
const badges = [
  {
    id: "meme-lord",
    name: "Meme Lord",
    icon: <Trophy className="h-4 w-4 text-yellow-500" />,
    description: "Received 10,000 likes across all posts",
    requirement: 10000,
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  {
    id: "rising-star",
    name: "Rising Star",
    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
    description: "Received 100 likes across all posts",
    requirement: 100,
    color: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  {
    id: "daily-grinder",
    name: "Daily Grinder",
    icon: <Flame className="h-4 w-4 text-orange-500" />,
    description: "Posted memes for 7 consecutive days",
    requirement: 7,
    color: "bg-gradient-to-r from-orange-400 to-orange-600",
  },
  {
    id: "community-pillar",
    name: "Community Pillar",
    icon: <Users className="h-4 w-4 text-green-500" />,
    description: "Received 50 comments across all posts",
    requirement: 50,
    color: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    id: "award-winner",
    name: "Award Winner",
    icon: <Award className="h-4 w-4 text-purple-500" />,
    description: "Had a post featured in the top memes of the week",
    requirement: 1,
    color: "bg-gradient-to-r from-purple-400 to-purple-600",
  },
]

// Mock top memes data
const topMemes = [
  {
    id: "top1",
    username: "janedoe",
    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    title: "When the code works on the first try",
    likes: 1204,
  },
  {
    id: "top2",
    username: "bobsmith",
    profilePic: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    title: "Monday morning mood",
    likes: 982,
  },
  {
    id: "top3",
    username: "alicejones",
    profilePic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    title: "Programming in a nutshell",
    likes: 756,
  },
]

// Mock top users data
const topUsers = [
  {
    username: "janedoe",
    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    posts: 42,
    likes: 3204,
  },
  {
    username: "bobsmith",
    profilePic: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    posts: 38,
    likes: 2982,
  },
  {
    username: "alicejones",
    profilePic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    posts: 31,
    likes: 2756,
  },
]

export function RightSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [streak, setStreak] = useState(5)
  const [progress, setProgress] = useState(0)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [timeFrame, setTimeFrame] = useState("day")

  // Simulate loading user profile data
  useEffect(() => {
    if (user) {
      const profile = getUserProfile(user.username)
      setUserProfile(profile)

      // Calculate total likes across all posts
      const totalLikes = profile.posts.reduce((sum: number, post: any) => sum + post.likes, 0)

      // Calculate progress to next badge (Meme Lord)
      const nextBadgeRequirement = 10000
      const progressValue = Math.min((totalLikes / nextBadgeRequirement) * 100, 100)
      setProgress(progressValue)
    }
  }, [user])

  // Skip rendering if no user or on certain pages
  if (!user || pathname === "/" || !userProfile) {
    return null
  }

  // Determine which badges the user has earned
  const earnedBadges = badges.filter((badge) => {
    if (badge.id === "rising-star") {
      // Calculate total likes across all posts
      const totalLikes = userProfile.posts.reduce((sum: number, post: any) => sum + post.likes, 0)
      return totalLikes >= badge.requirement
    }
    if (badge.id === "daily-grinder") {
      return streak >= badge.requirement
    }
    // For demo purposes, let's say they've earned the Award Winner badge
    if (badge.id === "award-winner") {
      return true
    }
    return false
  })

  return (
    <div className="hidden w-80 flex-col gap-6 lg:flex">
      {/* User Profile Quick View */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userProfile.profilePicture} alt={userProfile.username} />
              <AvatarFallback>{userProfile.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{userProfile.username}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                {userProfile.bio || "No bio yet"}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-muted p-2">
              <div className="text-sm font-medium">{userProfile.posts.length}</div>
              <div className="text-xs text-muted-foreground">Posts</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="text-sm font-medium">{userProfile.followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="text-sm font-medium">
                {userProfile.posts.reduce((sum: number, post: any) => sum + post.likes, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="mt-4 flex items-center gap-2">
            <div className="relative">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {streak}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium">{streak}-day streak!</span> Keep it up!
            </div>
          </div>

          {/* Badge Progress */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium">Progress to Meme Lord</span>
              <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 text-xs font-medium">Earned Badges</div>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  {earnedBadges.map((badge) => (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", badge.color)}>
                          {badge.icon}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="text-sm font-semibold">{badge.name}</div>
                        <div className="text-xs">{badge.description}</div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href={`/profile/${userProfile.username}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Full Profile
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Achievement Board */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <Tabs defaultValue="memes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="memes">Top Memes</TabsTrigger>
              <TabsTrigger value="users">Top Users</TabsTrigger>
            </TabsList>
            <div className="mt-2">
              <div className="flex items-center justify-end gap-2 mb-2">
                <div className="text-xs text-muted-foreground">Time frame:</div>
                <select
                  className="text-xs bg-transparent border rounded px-1 py-0.5"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            <TabsContent value="memes" className="mt-0">
              <div className="space-y-3">
                {topMemes.map((meme, index) => (
                  <div key={meme.id} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                        index === 0
                          ? "bg-yellow-500 text-yellow-950"
                          : index === 1
                            ? "bg-gray-300 text-gray-700"
                            : index === 2
                              ? "bg-amber-700 text-amber-50"
                              : "bg-muted text-muted-foreground",
                      )}
                    >
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={meme.profilePic} alt={meme.username} />
                      <AvatarFallback>{meme.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{meme.title}</div>
                      <div className="text-xs text-muted-foreground">by @{meme.username}</div>
                    </div>
                    <div className="text-xs font-medium">{meme.likes.toLocaleString()} ❤️</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="users" className="mt-0">
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={user.username} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                        index === 0
                          ? "bg-yellow-500 text-yellow-950"
                          : index === 1
                            ? "bg-gray-300 text-gray-700"
                            : index === 2
                              ? "bg-amber-700 text-amber-50"
                              : "bg-muted text-muted-foreground",
                      )}
                    >
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profilePic} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">@{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.posts} posts</div>
                    </div>
                    <div className="text-xs font-medium">{user.likes.toLocaleString()} ❤️</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

