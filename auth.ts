import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const allowedDomains = ['@gmail.com', '@example.org', '@example.net']

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        console.log(profile)
        return profile?.email_verified &&
          allowedDomains.some((domain) => profile?.email?.endsWith(domain))
          ? true
          : false
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
})
