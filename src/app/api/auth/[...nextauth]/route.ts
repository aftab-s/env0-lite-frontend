import { session } from '@/lib/session'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import GitlabProvider from 'next-auth/providers/gitlab'
import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth'
import { authSignIn, checkUserByEmail } from '@/services/query/useAuthentication'


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
     GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID!,
      clientSecret: process.env.GITLAB_CLIENT_SECRET!,
    }),
    BitbucketProvider({
      clientId: process.env.GITLAB_CLIENT_ID!,
      clientSecret: process.env.GITLAB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
        if (!profile?.email) throw new Error("No profile");

        try {
      // 1. Check if user exists in DB
      const existingUser = await checkUserByEmail({email: profile.email}); 

      if (existingUser) {
        return true;
      }

      const res = await authSignIn({email: profile?.email, password:"", role:'user'});

    } catch (err) {
        console.error("API error:", err);
        return false;
        }

        return true;
    },
    session,
    async redirect({ url, baseUrl }) {
    // Always send users to dashboard
    return `${baseUrl}/dashboard`;
    },
    async jwt({ token, profile }) {
        try {
            if (!profile?.email) throw new Error("No email in profile");

            const existingUser = await checkUserByEmail({ email: profile.email });

            const providerId = (profile as any).id || (profile as any).sub || (profile as any).uuid;

            token.id = existingUser?.userId.toString() || providerId;
            token.email = profile.email;
            token.role = existingUser?.role || "user";

        } catch (err) {
            console.error("JWT callback error:", err);
            token.id = token.id || "unknown";
            token.email = token.email || "unknown@example.com";
            token.role = token.role || "user";
        }

        return token;
        },
  },
}

export default function BitbucketProvider<P extends Record<string, any>>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "bitbucket",
    name: "Bitbucket",
    type: "oauth",
    authorization: {
      url: "https://bitbucket.org/site/oauth2/authorize",
      params: { scope: "account email" }, // 👈 scope goes here
    },
    token: "https://bitbucket.org/site/oauth2/access_token",
    userinfo: "https://api.bitbucket.org/2.0/user",
    async profile(profile, tokens) {
      return {
        id: profile.uuid,
        name: profile.display_name,
        email: profile.email ?? null, // may require /2.0/user/emails API call
        image: profile.links?.avatar?.href ?? null,
      };
    },
    options,
  };
}


const handler = NextAuth(authOption)
export { handler as GET, handler as POST }