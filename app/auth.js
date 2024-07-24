import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from './data/users';

const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        user: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const user = getUser(credentials.user);
          if (user && user.password === credentials.password) {
            return user;
          } else {
            throw new Error("Email or Password is incorrect");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
export default NextAuth(authOptions);
