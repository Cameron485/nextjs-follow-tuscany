import { auth } from '@/auth'
import SignIn from '../../components/SignIn'
import { SignOut } from '../../components/SignOut'

export default async function Page() {
  const session = await auth()

  if (!session) {
    return (
      <div>
        <SignIn />
      </div>
    )
  }

  return (
    <div>
      <SignOut />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
