import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { firstName, lastName, email, password } = await request.json();

    await connectMongoDB();

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        password_last_changed: Date.now(),
        role: 'admin',
    });

    try {
        await newUser.save();
        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (err: any) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};