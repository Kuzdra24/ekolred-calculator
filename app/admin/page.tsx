import React from 'react';
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Admin() {
    const session = await getServerSession(nextAuthOptions);
    console.log(session);
    
    if (!session) {
        redirect("/login?callbackUrl=/admin");
    }

    return (
        <div>admin</div>
    )
}