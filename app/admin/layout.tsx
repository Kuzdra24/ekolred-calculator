import './style.css';

import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect("/login?callbackUrl=/admin");
    }


    return (
        <div className='dashboard-layout'>
            <nav className='side-nav'>

                <div>
                    <h2 className="header">
                        Panel Administratora
                    </h2>

                    <ul className='menu'>
                        <li className='menu-item'><a href="/admin">🖥️ Dashboard</a></li>
                        <li className='menu-item'><a href="/">☀️ Solar Modules</a></li>
                        <li className='menu-item'><a href="/">⚡ Inverters</a></li>
                        <li className='menu-item'><a href="/">🔋 Energy Storage</a></li>
                        <li className='menu-item'><a href="/admin/serviceRegion">📊 Stats</a></li>
                    </ul>
                </div>

                <div className='user'>
                    <span style={{ fontSize: "0.75rem" }}>Zalogowano:</span>
                    <br />
                    <a href="/admin/settings" style={{ display: "block", marginTop: "0.5rem" }}>
                        🔗 {session.user.firstName + " " + session.user.lastName}
                    </a>
                </div>
            </nav>

            <div className="content">
                {children}
            </div>
        </div>
    )
}