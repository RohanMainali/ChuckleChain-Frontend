"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserProfile } from "@/lib/types"

interface EditProfileDialogProps {
  profile: UserProfile
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (profile: Partial<UserProfile>) => void
}

export function EditProfileDialog({ profile, open, onOpenChange, onUpdate }: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    bio: profile.bio || "",
    website: profile.website || "",
    profilePicture: profile.profilePicture,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, we would update the profile on the server
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onUpdate(formData)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.profilePicture} alt={profile.username} />
              <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <Button variant="outline" size="sm" type="button">
              Change Photo
            </Button>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Name</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

