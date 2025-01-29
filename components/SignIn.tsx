import { signIn } from '@/auth'

const SignIn = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <button className="text-3xl font-bold underline" type="submit">
        Sign in
      </button>
    </form>
  )
}

export default SignIn
