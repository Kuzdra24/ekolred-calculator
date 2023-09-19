import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import connectMongoDB from "./mongodb";
import User from "@/models/user";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",

            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "email@example.com",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                await connectMongoDB();

                if (credentials == null) return null;

                // login
                try {
                    const user = await User.findOne({ email: credentials.email });

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password,
                        );
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or password is incorrect");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],

    pages: {
        signIn: "/login",
        newUser: "/",
        error: "/login",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        session: async ({ session, token }: any) => {
            if (session?.user) {
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
            }
            return session;
        },

        jwt: async ({ user, token }: any) => {
            if (user) {
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },
    },
};