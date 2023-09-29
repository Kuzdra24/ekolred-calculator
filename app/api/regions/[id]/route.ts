import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Region from "@/models/region";

export const GET = async (
    request: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    await connectMongoDB();

    try {
        const region = await Region.findOne({ id: Number(params.id) }).exec();

        if (region) {
            return NextResponse.json(JSON.stringify(
                { active: true, price: region.price }
            ), { status: 200 });
        } else {
            return NextResponse.json(JSON.stringify(
                { active: false, price: null }
            ), { status: 200 });
        }
    } catch (err: any) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};
