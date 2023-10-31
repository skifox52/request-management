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
        const parsedData = loginSchema.safeParse(credentials)
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
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id
      return session
    },
    jwt: ({ user, account, token }) => {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
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
