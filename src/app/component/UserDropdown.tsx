"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface UserDropdownProps {
  email: string;
}

const UserDropdown = ({ email }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ปิดดรอปดาวน์เมื่อคลิกที่อื่น
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">{email}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">Signed in as</p>
            <p className="text-xs text-gray-600 truncate">{email}</p>
          </div>
          
          <Link href="/my-product">
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Products
            </div>
          </Link>
          
          <Link href="/my-offer">
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Offers
            </div>
          </Link>
          
          <div className="border-t border-gray-200 mt-1"></div>
          
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;