"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-8">
      <Link
        href="/"
        className="text-2xl font-light tracking-[0.3em] uppercase text-white"
      >
        FERDINAND
      </Link>
      <div className="hidden md:flex items-center gap-12 text-sm tracking-wider text-white">
        <Link
          href="/work"
          className={`transition-opacity ${
            pathname === "/work" ? "opacity-100" : "opacity-60 hover:opacity-100"
          }`}
        >
          Work
        </Link>
        <Link
          href="/about"
          className={`transition-opacity ${
            pathname === "/about" ? "opacity-100" : "opacity-60 hover:opacity-100"
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`transition-opacity ${
            pathname === "/contact" ? "opacity-100" : "opacity-60 hover:opacity-100"
          }`}
        >
          Contact
        </Link>
      </div>
      <button className="md:hidden text-white">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
  );
}
