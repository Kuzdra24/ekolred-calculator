import Region from "@/models/region";
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
        const regions = await Region.find({}).exec();

        return new NextResponse(JSON.stringify(regions), {
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
    const { id, name, price, active, coordinates} = await request.json();

    const session = await getServerSession(nextAuthOptions);
    if (!session) {
        return new NextResponse("Unauthenticated", {
            status: 401,
        });
    }

    await connectMongoDB();

    try {
        await Region.updateOne({ id }, { id, name, price, active, coordinates }, { upsert: true }).exec();

        return new NextResponse("Region updated", {
            status: 201,
        });
    } catch (err: any) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};