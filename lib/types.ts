export interface User {
  id: string
  username: string
  profilePicture: string
}

export interface UserProfile extends User {
  fullName?: string
  bio?: string
  website?: string
  followers: number
  following: number
  isFollowing: boolean
  posts: Post[]
}

export interface Post {
  id: string
  user: {
    id: string
    username: string
    profilePicture: string
  }
  text: string
  image: string
  createdAt: string
  likes: number
  isLiked: boolean
  comments: {
    id: string
    user: string
    text: string
  }[]
}

export interface Conversation {
  id: string
  user: {
    id: string
    username: string
    profilePicture: string
  }
  messages: Message[]
  lastMessage: {
    text: string
    timestamp: string
  }
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
}

export interface Notification {
  id: string
  type: "like" | "comment" | "follow"
  user: {
    id: string
    username: string
    profilePicture: string
  }
  content?: string
  timestamp: string
}

