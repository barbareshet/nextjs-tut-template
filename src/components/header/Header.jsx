import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black">
      <div className="container h-16  flex justify-between items-center">
        <div className="logo text-white">
          <h2 className="text-white font-semibold">Invoice<span className="text-color-secondary">Manager</span></h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/" className="text-white">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
