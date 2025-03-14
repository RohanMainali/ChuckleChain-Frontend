import { MainLayout } from "@/components/main-layout"
import { Profile } from "@/components/profile"
import { getUserProfile } from "@/lib/data"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const profile = getUserProfile(params.username)

  return (
    <MainLayout>
      <Profile profile={profile} />
    </MainLayout>
  )
}

