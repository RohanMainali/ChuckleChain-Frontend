import type { User, UserProfile, Post, Conversation, Notification } from "./types"

// Replace the mock users with real profile pictures
const currentUser: User = {
  id: "user1",
  username: "johndoe",
  profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
}

// Mock users
const users = [
  currentUser,
  {
    id: "user2",
    username: "janedoe",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: "user3",
    username: "bobsmith",
    profilePicture: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: "user4",
    username: "alicejones",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
  },
]

// Replace placeholder images with reliable meme images
const posts: Post[] = [
  {
    id: "post1",
    user: users[1],
    text: "When you finally fix that bug after hours of debugging",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likes: 42,
    isLiked: true,
    comments: [
      {
        id: "comment1",
        user: "bobsmith",
        text: "Been there! 😂",
      },
      {
        id: "comment2",
        user: "johndoe",
        text: "So relatable!",
      },
    ],
  },
  {
    id: "post2",
    user: users[2],
    text: "Monday morning mood",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&h=400&fit=crop",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 24,
    isLiked: false,
    comments: [
      {
        id: "comment3",
        user: "janedoe",
        text: "I feel this in my soul",
      },
    ],
  },
  {
    id: "post3",
    user: users[3],
    text: "When someone says they'll be there in 5 minutes",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&h=400&fit=crop",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likes: 56,
    isLiked: false,
    comments: [],
  },
]

// Update user profiles with reliable meme images
const userProfiles: Record<string, UserProfile> = {
  johndoe: {
    ...currentUser,
    fullName: "John Doe",
    bio: "Meme enthusiast and professional procrastinator",
    website: "https://example.com",
    followers: 245,
    following: 123,
    isFollowing: false,
    posts: [
      {
        id: "post4",
        user: currentUser,
        text: "When the code works on the first try",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        likes: 78,
        isLiked: false,
        comments: [
          {
            id: "comment4",
            user: "bobsmith",
            text: "Never happened to me 😅",
          },
        ],
      },
    ],
  },
  janedoe: {
    ...users[1],
    fullName: "Jane Doe",
    bio: "Digital artist and meme creator",
    website: "https://janedoe.com",
    followers: 1024,
    following: 567,
    isFollowing: true,
    posts: [posts[0]],
  },
  bobsmith: {
    ...users[2],
    fullName: "Bob Smith",
    bio: "Just here for the memes",
    followers: 512,
    following: 256,
    isFollowing: true,
    posts: [posts[1]],
  },
  alicejones: {
    ...users[3],
    fullName: "Alice Jones",
    bio: "Meme queen 👑",
    website: "https://alicejones.dev",
    followers: 789,
    following: 345,
    isFollowing: false,
    posts: [posts[2]],
  },
}

// Mock conversations
const conversations: Conversation[] = [
  {
    id: "conv1",
    user: users[1],
    messages: [
      {
        id: "msg1",
        senderId: users[1].id,
        text: "Hey, did you see that new meme format?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "msg2",
        senderId: currentUser.id,
        text: "Yeah, it's hilarious! I'm going to make one later",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: "msg3",
        senderId: users[1].id,
        text: "Can't wait to see it!",
        timestamp: new Date(Date.now() - 3400000).toISOString(),
      },
    ],
    lastMessage: {
      text: "Can't wait to see it!",
      timestamp: new Date(Date.now() - 3400000).toISOString(),
    },
  },
  {
    id: "conv2",
    user: users[2],
    messages: [
      {
        id: "msg4",
        senderId: currentUser.id,
        text: "That meme you posted yesterday was gold",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "msg5",
        senderId: users[2].id,
        text: "Thanks! I spent way too much time on it 😂",
        timestamp: new Date(Date.now() - 85000000).toISOString(),
      },
    ],
    lastMessage: {
      text: "Thanks! I spent way too much time on it 😂",
      timestamp: new Date(Date.now() - 85000000).toISOString(),
    },
  },
  {
    id: "conv3",
    user: users[3],
    messages: [
      {
        id: "msg6",
        senderId: users[3].id,
        text: "Do you have the template for that meme?",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: "msg7",
        senderId: currentUser.id,
        text: "Sure, I'll send it over!",
        timestamp: new Date(Date.now() - 172700000).toISOString(),
      },
    ],
    lastMessage: {
      text: "Sure, I'll send it over!",
      timestamp: new Date(Date.now() - 172700000).toISOString(),
    },
  },
]

// Mock notifications
const notifications: Notification[] = [
  {
    id: "notif1",
    type: "like",
    user: users[1],
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "notif2",
    type: "comment",
    user: users[2],
    content: "This is hilarious! 😂",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "notif3",
    type: "follow",
    user: users[3],
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "notif4",
    type: "like",
    user: users[2],
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "notif5",
    type: "comment",
    user: users[1],
    content: "I can relate to this so much!",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
  },
]

// Data access functions
export function getCurrentUser(): User {
  return currentUser
}

export function getUserProfile(username: string): UserProfile {
  return userProfiles[username] || userProfiles.johndoe
}

export function getPosts(): Post[] {
  return [...posts]
}

export function getConversations(): Conversation[] {
  return [...conversations]
}

export function getNotifications(): Notification[] {
  return [...notifications]
}

// Add new functions to support the additional pages

// Get trending posts
export function getTrendingPosts(): Post[] {
  // In a real app, this would be based on engagement metrics
  // For demo, we'll just return some posts with high likes
  return [
    {
      id: "trending1",
      user: users[1],
      text: "This is what peak performance looks like",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&h=400&fit=crop",
      createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
      likes: 1204,
      isLiked: false,
      comments: [
        {
          id: "tcomment1",
          user: "bobsmith",
          text: "I can't stop laughing 😂",
        },
        {
          id: "tcomment2",
          user: "alicejones",
          text: "This is gold!",
        },
      ],
    },
    {
      id: "trending2",
      user: users[2],
      text: "When you realize it's only Tuesday",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop",
      createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
      likes: 982,
      isLiked: true,
      comments: [
        {
          id: "tcomment3",
          user: "johndoe",
          text: "Every. Single. Week.",
        },
      ],
    },
    {
      id: "trending3",
      user: users[3],
      text: "Programming in a nutshell",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
      createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
      likes: 756,
      isLiked: false,
      comments: [],
    },
  ]
}

// Get fresh posts
export function getFreshPosts(): Post[] {
  // In a real app, this would be the most recent posts
  // For demo, we'll just return some posts with recent timestamps
  return [
    {
      id: "fresh1",
      user: users[3],
      text: "Just made this fresh meme",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&h=400&fit=crop",
      createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
      likes: 12,
      isLiked: false,
      comments: [],
    },
    {
      id: "fresh2",
      user: users[1],
      text: "Hot off the press",
      image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=400&fit=crop",
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      likes: 45,
      isLiked: false,
      comments: [
        {
          id: "fcomment1",
          user: "johndoe",
          text: "First! 😎",
        },
      ],
    },
  ]
}

// Get posts by category
export function getCategoryPosts(category: string): Post[] {
  // In a real app, posts would be tagged with categories
  // For demo, we'll return different posts based on the category name

  const categoryPosts: Record<string, Post[]> = {
    entertainment: [
      {
        id: "ent1",
        user: users[2],
        text: "Movie night expectations vs reality",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        likes: 342,
        isLiked: false,
        comments: [],
      },
      {
        id: "ent2",
        user: users[1],
        text: "When the movie adaptation ruins your favorite book",
        image: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        likes: 256,
        isLiked: true,
        comments: [],
      },
    ],
    sports: [
      {
        id: "sports1",
        user: users[3],
        text: "Me after exercising for 5 minutes",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: 189,
        isLiked: false,
        comments: [],
      },
    ],
    gaming: [
      {
        id: "gaming1",
        user: users[0],
        text: "When you finally beat that boss after 50 attempts",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        likes: 421,
        isLiked: false,
        comments: [],
      },
      {
        id: "gaming2",
        user: users[2],
        text: "Gamers will understand",
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        likes: 315,
        isLiked: true,
        comments: [],
      },
    ],
    technology: [
      {
        id: "tech1",
        user: users[1],
        text: "Debugging be like",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        likes: 502,
        isLiked: false,
        comments: [],
      },
    ],
  }

  return categoryPosts[category] || []
}

// Get posts by hashtag
export function getHashtagPosts(tag: string): Post[] {
  // In a real app, posts would be tagged with hashtags
  // For demo, we'll return different posts based on the hashtag

  const hashtagPosts: Record<string, Post[]> = {
    MemeMonday: [
      {
        id: "mm1",
        user: users[2],
        text: "Starting the week right #MemeMonday",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: 234,
        isLiked: false,
        comments: [],
      },
    ],
    FunnyFriday: [
      {
        id: "ff1",
        user: users[3],
        text: "Friday mood #FunnyFriday",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        likes: 187,
        isLiked: true,
        comments: [],
      },
    ],
    DadJokes: [
      {
        id: "dj1",
        user: users[0],
        text: "My favorite dad joke #DadJokes",
        image: "https://images.unsplash.com/photo-1507808973436-a4ed7b5e87c9?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        likes: 156,
        isLiked: false,
        comments: [],
      },
    ],
    ProgrammerHumor: [
      {
        id: "ph1",
        user: users[1],
        text: "Every programmer knows this feeling #ProgrammerHumor",
        image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        likes: 423,
        isLiked: false,
        comments: [],
      },
      {
        id: "ph2",
        user: users[2],
        text: "When your code works on the first try #ProgrammerHumor",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        likes: 378,
        isLiked: true,
        comments: [],
      },
    ],
  }

  return hashtagPosts[tag] || []
}

