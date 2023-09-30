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
        session: async ({ session }: any) => {
            if (!session) return session;

            await connectMongoDB();

            const userData = await User.findOne({ email: session.user.email });

            session.user.id = userData._id;
            session.user.firstName = userData.firstName;
            session.user.lastName = userData.lastName;
            session.user.email = userData.email;

            return session;
        },

        jwt: async ({ user, token }: any) => {
            return token;
        },
    },
};