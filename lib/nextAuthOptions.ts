import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import connectMongoDB from "./mongodb";
import User from "@/models/user";

export const nextauthOptions: NextAuthOptions = {
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
        // async jwt(params: any) {
        //     if (params.user?.fullName) {
        //         params.token.fullName = params.user.fullName;
        //     }

        //     if (params.user?.email) {
        //         params.token.email = params.user.email;
        //     }
        //     return params.token;
        // },

        // async session({ session, token }: any) {
        //     session.fullName = token.fullName;
        //     session.email = token.email;
        //     return session;
        // },
    },
};