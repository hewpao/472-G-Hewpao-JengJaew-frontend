"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (session.status === "authenticated") {
    console.log(session.data);
  }

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {session.data ? (
          session.data.user ? (
            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-2xl font-bold">{session.data.user.name}</h1>
              <p className="text-sm text-gray-500">{session.data.user.email}</p>
            </div>
          ) : (
            <p className="text-red-600">No user found</p>
          )
        ) : (
          <p className="text-red-600">No session found</p>
        )}
      </main>
    </div>
  );
}
