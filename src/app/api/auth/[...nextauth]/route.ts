import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import GitLabProvider from "next-auth/providers/gitlab"
import { session } from "@/lib/session"
import { checkUserByEmail, authSignIn } from "@/services/query/useAuthentication"

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: "read:user user:email repo" } },
    }),
    GitLabProvider({
      clientId: process.env.GITLAB_CLIENT_ID!,
      clientSecret: process.env.GITLAB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session,

    async jwt({ token, profile, account }) {
      
      if (!profile?.email) return token

      try {
        let existingUser = await checkUserByEmail({ email: profile.email })

        if (!existingUser) {
          existingUser = await authSignIn({
            email: profile.email,
            name: profile.name || "",
            role: 'user',
            password: 'null'
          })
        }

        // 3. Attach DB info to JWT
        token.email = existingUser.email
        token.role = existingUser.role || "user"
        token.name = existingUser.name

        if (account?.access_token) {
          token.githubAccessToken = account.access_token;
        }
      } catch (err) {
        console.error("JWT DB error:", err)
      }

      return token
    },
    // async redirect({ url, baseUrl }) {
    // return `${baseUrl}/dashboard`;
  // },
  },
  pages: {
    signIn: "/",   
    error: "/", 

  },
  events: {
    async signIn({ user }) {
      console.log("✅ User signed in:", user.email)
    },
  },
  
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
