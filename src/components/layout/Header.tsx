"use client";

import Link from "next/link";
import { CustomImage } from "@/components/ui/CustomImage";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <CustomImage
              src="/images/logo.png"
              alt="samsunglionsblue Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-bold">samsunglionsblue</span>
          </Link>

          <nav className="hidden space-x-8 md:flex">
            <Link href="/team" className="hover:text-blue-200">
              Team
            </Link>
            <Link href="/schedule" className="hover:text-blue-200">
              Schedule
            </Link>
            <Link href="/news" className="hover:text-blue-200">
              News
            </Link>
            <Link href="/tickets" className="hover:text-blue-200">
              Tickets
            </Link>
            <Link href="/shop" className="hover:text-blue-200">
              Shop
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <button
                onClick={() => signOut()}
                className="rounded bg-blue-700 px-4 py-2 hover:bg-blue-600"
              >
                로그아웃
              </button>
            ) : (
              <Link href="/" className="rounded bg-blue-700 px-4 py-2 hover:bg-blue-600">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
