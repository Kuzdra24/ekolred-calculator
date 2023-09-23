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
                        <li className='menu-item'><a href="/admin">🖥️ Panel główny</a></li>
                        <li className='menu-item'><a href="/">⚙️ Ustawienia serwisu</a></li>
                        <li className='menu-item'><a href="/">☀️ Moduły</a></li>
                        <li className='menu-item'><a href="/">⚡ Falowniki</a></li>
                        <li className='menu-item'><a href="/">🔋&nbsp; Magazyny energii</a></li>
                        <li className='menu-item'><a href="/admin/serviceRegion">🗺️ Mapa zasięgu</a></li>
                        <li className='menu-item'><a href="/admin/list">👤&nbsp; Administratorzy (?)</a></li>
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