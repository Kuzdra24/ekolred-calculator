import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";

export const GET = async () => {

    const session = await getServerSession(nextAuthOptions);
    if (!session) {
        return new NextResponse("Unauthenticated", {
            status: 401,
        });
    }

    await connectMongoDB();

    try {
        const users = await User.find({}).exec();

        return NextResponse.json(users, {
            status: 200,
        });
    } catch (err: any) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }

};