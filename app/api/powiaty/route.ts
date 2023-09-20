import Powiat from "@/models/powiat";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const GET = async (request: NextRequest) => {

    const session = await getServerSession(nextAuthOptions);
    if (!session) {
        return new NextResponse("Unauthenticated", {
            status: 401,
        });
    }

    await connectMongoDB();

    try {
        const powiaty = await Powiat.find({}).exec();


        return new NextResponse(JSON.stringify(powiaty), {
            status: 200,
        });
    } catch (err: any) {
        // TODO change messages
        return new NextResponse(err.message, {
            status: 500,
        });
    }

};

export const POST = async (request: NextRequest) => {
    const { id, nazwa, stawka, aktywny } = await request.json();

    const session = await getServerSession(nextAuthOptions);
    if (!session) {
        return new NextResponse("Unauthenticated", {
            status: 401,
        });
    }

    await connectMongoDB();

    try {
        await Powiat.updateOne({ id }, { id, nazwa, stawka, aktywny }, { upsert: true }).exec();

        return new NextResponse("Powiat updated", {
            status: 201,
        });
    } catch (err: any) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};