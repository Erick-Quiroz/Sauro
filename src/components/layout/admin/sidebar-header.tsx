"use client";

import Image from "next/image";
import Link from "next/link";

export function SidebarHeader() {
  return (
    <div className="p-6 border-b border-white/10">
      <Link href="/admin" className="flex items-center justify-center">
        <Image src="/logo.png" alt="SAURO" width={80} height={80} />
      </Link>
    </div>
  );
}
