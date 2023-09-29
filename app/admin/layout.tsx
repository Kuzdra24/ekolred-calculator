import "./style.css";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sidebar } from "../../components/admin/Sidebar";



interface DashboardProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="dashboard-layout">
      <Sidebar session={session} />
      <div className="content">{children}</div>
    </div>
  );
}
