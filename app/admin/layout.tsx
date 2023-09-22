import './style.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='dashboard-layout'>
            <nav className='side-nav'>

                <h2 className="header">
                    Panel Administratora
                </h2>

                <ul className='menu'>
                    <li className='menu-item'><a href="/admin">Dashboard</a></li>
                    <li className='menu-item'><a href="#">Modules</a></li>
                    <li className='menu-item'><a href="#">Inverters</a></li>
                    <li className='menu-item'><a href="#">Storage</a></li>
                    <li className='menu-item'><a href="/admin/serviceRegion">Stats</a></li>
                </ul>
            </nav>

            <div className="content">
                {children}
            </div>
        </div>
    )
}