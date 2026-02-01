import React from "react";
import Link from "next/link";
import Image from "next/image";

export function ClientHeader() {
  return (
    <header className="bg-neutral-800 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </Link>

          {/* <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
          >
            Login
          </Link> */}
          <Link
            href="/admin"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
