import React from 'react';
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect("/login?callbackUrl=/admin");
    }

    return (
        <>
            <div>admin dashboard</div>
        </>
    )
}