// temporary - just to test session and jwt

"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function LoginButton() {
    const session: any = useSession();
    const router = useRouter();

    if (session.status === "authenticated") {
        return (
            <>
                Logged in as {session.data.user?.firstName + " " + session.data.user?.lastName}
                <button onClick={() => { signOut() }}>Sign out</button>
            </>
        );
    }

    return (
        <>
            <button onClick={() => { router.push('/login') }}>Sign in</button>
        </>
    );
}