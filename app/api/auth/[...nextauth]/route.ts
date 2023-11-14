import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "@/app/zod/loginSchema"
import { User } from "@prisma/client"
import { compare } from "bcrypt"
import NextAuth from "next-auth"
import prismaClient from "@/app/utils/prismaClient"

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials: any): Promise<User | null> => {
        const { username, password } = credentials
        const parsedData = loginSchema.safeParse({ username, password })
        if (!parsedData.success) return null
        try {
          const user: User | null = await prismaClient.user.findFirst({
            where: { username: credentials!.username },
          })
          if (!user) return null
          const comparedPassword: boolean = await compare(
            credentials!.password,
            user.password
          )
          if (!comparedPassword) return null
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id
      session.user.role = token?.role
      return session
    },
    jwt: ({ user, account, token }) => {
      const usr: User = user as User
      if (account) {
        token.accessToken = account.access_token
        token.id = usr.id
        token.role = usr.role
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
