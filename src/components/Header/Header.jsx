"use client";
import { useState, useEffect } from "react";
import { useCourseContext } from "@/contexts/CourseContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = ({ firstName = "User" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { state, dispatch } = useCourseContext();
  const [hasNotification, setHasNotification] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  // Show notification when courses change
  useEffect(() => {
    if (state.courses.length > 0) {
      setHasNotification(true);
      const timer = setTimeout(() => setHasNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.courses]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="h-10 w-32  flex items-center justify-center">
              <Image
                src="/cartedo-logo.svg"
                alt="Cartedo Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
                onError={() => setLogoError(true)}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center mx-4 flex-1 max-w-md"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute left-3 top-2.5">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Icons and profile */}
        <div className="flex items-center space-x-4">
          {/* Mobile search icon */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <div className="relative">
            <button className="text-gray-600 hover:text-gray-900 relative">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {hasNotification && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 hidden md:inline-block font-medium">
              {firstName}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {showMobileSearch && (
        <div className="md:hidden px-4 py-2 bg-gray-50">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute left-3 top-2.5">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
