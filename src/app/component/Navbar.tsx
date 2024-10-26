"use client"; 
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Full Crypto</h1>
        <div className="space-x-4">
          <Link
            href="/"
            className={`${
              activePath === "/" ? "text-white font-semibold border-b-2 border-white" : "text-gray-300"
            } px-2 py-1 hover:text-white`}
          >
            BTC Clicker
          </Link>
          <Link
            href="/stats"
            className={`${
              activePath === "/stats" ? "text-white font-semibold border-b-2 border-white" : "text-gray-300"
            } px-2 py-1 hover:text-white`}
          >
            Stats
          </Link>
          {/* <Link
            href="/shop"
            className={`${
              activePath === "/shop" ? "text-white font-semibold border-b-2 border-white" : "text-gray-300"
            } px-2 py-1 hover:text-white`}
          >
            Shop
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
