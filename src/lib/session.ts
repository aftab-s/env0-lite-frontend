import { User, getServerSession } from 'next-auth'

export const session = async ({ session, token }: any) => {
  if (!session.user) session.user = {};

  session.user.email = token.email;
  session.user.name = token.name;
  session.user.role = token.role;
  session.user.githubAccessToken = token.githubAccessToken; // this is the key
  return session;
}

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  })
  // if (!authUserSession) throw new Error('unauthorized')
  return authUserSession?.user
}