"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Bell, Home, LaughIcon, LogOut, MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/feed" className="flex items-center gap-2 text-xl font-bold">
            <LaughIcon className="h-8 w-8 text-primary" />
            <span className="hidden md:inline">ChuckleChain</span>
          </Link>

          <div className="relative ml-4 hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search memes..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
        </div>

        <nav className="flex items-center gap-1 md:gap-2">
          <Link href="/feed">
            <Button variant={pathname === "/feed" ? "default" : "ghost"} size="icon" className="rounded-full">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>

          <Link href="/messages">
            <Button variant={pathname === "/messages" ? "default" : "ghost"} size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>

          <Link href="/notifications">
            <Button variant={pathname === "/notifications" ? "default" : "ghost"} size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>

          <ModeToggle />

          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

