import React from 'react';
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const PowiatyMap = dynamic(
    () => import("@/components/AdminMap/PowiatyMap"),
    { ssr: false }
);

export default async function ServiceRegion() {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect("/login?callbackUrl=/admin");
    }

    return (
        <>
            <div>service region map</div>
            <PowiatyMap style={{height: "500px", width: "800px"}}></PowiatyMap>
        </>
    )
}