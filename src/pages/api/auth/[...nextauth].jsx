import NextAuth from 'next-auth'

export default NextAuth({
  providers: [
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id // eslint-disable-line
      return session
    }
  }
})
