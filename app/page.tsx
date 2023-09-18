import { InputPlace } from "@/components/InputPlace";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      {/* <h1 className="text-4xl font-semibold text-teal-900">Calculator</h1> */}
      <InputPlace id="place-inp" name="input-place"/>

    </main>
  );
}
