import type { Metadata } from 'next'
import { auth } from '@/auth'
import SignIn from '../../components/SignIn'

export const metadata: Metadata = {
  title: 'Follow Tuscany - Admin',
  description: 'Super secret admin area',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session) {
    return (
      <div>
        <SignIn />
      </div>
    )
  }

  return <div>{children}</div>
}
