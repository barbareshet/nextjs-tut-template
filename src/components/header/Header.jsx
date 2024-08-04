import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black">
      <div className="container h-16  flex justify-between items-center max-w-[1200px] px-2">
        <div className="logo text-white">
          <h2 className="text-white font-semibold">Invoice<span className="text-color-secondary">Manager</span></h2>
        </div>
        <nav>
          <ul className="flex gap-2">
            <li>
              <Link href="/" className="text-white">Home</Link>
            </li>
            <li>
              <Link href="/customers" className="text-white">Customers</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
