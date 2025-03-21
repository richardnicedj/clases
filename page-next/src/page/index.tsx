import Image from "next/image";
import Table from "@/components/Table";
import { TableComponent } from "@/components/Table";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start border bg-red-900 p-8">
        {/* <Table /> */}
      </main>
    </div>
  );
}
