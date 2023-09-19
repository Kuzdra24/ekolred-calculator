import LoginButton from "@/components/LoginButton";
import { MapWrapper } from "@/components/MapComponent/MapWrapper";

import dynamic from "next/dynamic";
const PowiatyMap = dynamic(
  () => import("@/components/MapComponent/PowiatyMap"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <MapWrapper />
      <LoginButton />
    </main>
  );
}
