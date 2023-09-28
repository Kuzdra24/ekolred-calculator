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
      return new NextResponse(JSON.stringify(region), {
        status: 200,
      });
    } else {
      return new NextResponse("Region not found", {
        status: 404,
      });
    }
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
