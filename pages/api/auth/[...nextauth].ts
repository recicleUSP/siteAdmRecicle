import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) : Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential) {
          return {
            uid: userCredential.user.uid,
            email: email,
          }
        } else
          return new Error('invalid credentials');
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user=user
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return Promise.resolve(session)
    },
  },
};

export default NextAuth(authOptions);