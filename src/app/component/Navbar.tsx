"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal"; // Import the AuthModal component
import UserDropdown from "./UserDropdown";
import Image from "next/image"; // Import the UserDropdown component

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // เพิ่ม useEffect เพื่อควบคุม scroll และ pointer events
  useEffect(() => {
    if (isModalOpen) {
      // เมื่อ modal เปิด ไม่ให้ scroll หน้าหลัก
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      // เมื่อ modal ปิด ให้ scroll หน้าหลักได้ตามปกติ
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (session.status === "authenticated") {
    console.log(session.data);
  }

  return (
    <>
      <nav className="grid grid-cols-3 px-6 py-4 bg-white shadow-sm items-center">
        <Link href="/" className="w-fit">
          <div className="text-primary text-xl font-bold hover:text-dark-primary ease-in-out duration-300 flex items-center gap-3">
            <Image
                src="/images/HP5-1.png"
                alt="Hewpao service illustration"
                width={30}
                height={30}
            />
            <div>HewPao</div>
          </div>
        </Link>
        <div className="flex justify-center gap-20">
            <div>
                {session.data && session.data.user ? (
                    <Link
                        href="/order"
                        className={`relative font-bold ease-in-out duration-300 ${
                            pathname === "/order" ? "text-primary" : "text-gray-500"
                        } hover:text-primary after:block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-200 ${
                            pathname === "/order" ? "after:scale-x-100" : "after:scale-x-0"
                        } hover:after:scale-x-100 focus:after:scale-x-100`}
                    >
                        Order
                    </Link>
                ) : (
                    <Link
                        href="/signup"
                        className="font-bold text-gray-500 hover:text-primary"
                    >
                        Order
                    </Link>
                )}
            </div>
          <div>
            {session.data && session.data.user ? (
              session.data.user.is_verified ? (
                <Link
                    href="/product-requests"
                    className={`relative font-bold ease-in-out duration-300 ${
                        pathname === "/product-requests"
                            ? "text-primary"
                            : "text-gray-500"
                    } hover:text-primary after:block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-200 ${
                        pathname === "/product-requests"
                            ? "after:scale-x-100"
                            : "after:scale-x-0"
                    } hover:after:scale-x-100 focus:after:scale-x-100`}
                >
                  Travel
                </Link>
              ) : (
                <Link
                    href="/verification"
                    className={`relative font-bold ease-in-out duration-300 ${
                        pathname === "/verification" ? "text-primary" : "text-gray-500"
                    } hover:text-primary after:block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-200 ${
                        pathname === "/verification" ? "after:scale-x-100" : "after:scale-x-0"
                    } hover:after:scale-x-100 focus:after:scale-x-100`}
                >
                  Travel
                </Link>
              )
            ) : (
              <Link
                href="/signup"
                className="font-bold text-gray-500 hover:text-primary"
              >
                Travel
              </Link>
            )}

          </div>
        </div>

        <div className="flex justify-end">
          {session.data && session.data.user ? (
            <UserDropdown email={session.data.user.email || ""} />
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground gap-2 hover:bg-gray-600 text-sm h-10 px-4 cursor-pointer text-white font-medium"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Use the AuthModal component */}
      <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Navbar;