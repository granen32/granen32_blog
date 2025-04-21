"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // 로그아웃 로직 구현
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/home">
                  <img className="h-8 w-auto" src="/logo.png" alt="삼성 라이온즈" />
                </Link>
              </div>
              <nav className="ml-6 flex space-x-8">
                <Link
                  href="/ticket"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  티켓 예매
                </Link>
                <Link
                  href="/event"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  이벤트
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-primary ml-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
