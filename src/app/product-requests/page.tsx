"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../component/ProductCard";
import { useSession } from "next-auth/react";
import Link from "next/link";

function ProductRequestsPage() {
  // Get user session
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  // Reference to track scroll position
  const pageRef = useRef<HTMLDivElement>(null);

  // Filter state
  const [activeFilter, setActiveFilter] = useState("all");

  // Add scroll restoration when navigating back to this page
  useEffect(() => {
    // Save scroll position when leaving the page
    const handleBeforeUnload = () => {
      if (pageRef.current) {
        sessionStorage.setItem('productRequestsScrollPosition',
          window.scrollY.toString());
      }
    };

    // Restore scroll position when coming back to the page
    const restoreScrollPosition = () => {
      const scrollPosition = sessionStorage.getItem('productRequestsScrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Restore position on mount
    restoreScrollPosition();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="md:flex items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">Earn While You Travel</h1>
                <p className="text-xl mb-6">
                  Make money by bringing requested items to buyers from your destination.
                  Be a traveler who makes a difference!
                </p>
                {isAuthenticated ? (
                  <Link href="/my-offer" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block">
                    View My Offers
                  </Link>
                ) : (
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Sign Up to Start Earning
                  </button>
                )}
              </div>
              <div className="md:w-2/5">
                <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg border border-white border-opacity-20">
                  <h3 className="font-bold text-xl mb-3">How It Works</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-white bg-opacity-30 w-7 h-7 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
                      <p>Browse product requests from buyers</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white bg-opacity-30 w-7 h-7 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
                      <p>Make an offer on items you can deliver</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white bg-opacity-30 w-7 h-7 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
                      <p>Purchase and deliver the item to earn money</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-gray-50">
        <div className="px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Recently Requested Items
            </h2>
          </div>

          {/* Stats and benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-blue-500 mb-2">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Earn Extra Income</h3>
              <p className="text-gray-600">Make up to 200 THB commission on each delivery you complete</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-blue-500 mb-2">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Flexible Schedule</h3>
              <p className="text-gray-600">Pick up items during your travel on your own time</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-blue-500 mb-2">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Help Other People</h3>
              <p className="text-gray-600">Connect people with products they can't access locally</p>
            </div>
          </div>

          {/* Product cards */}
          <div className="p-6">
            {/* Pass the active filter to the ProductCard component */}
            <ProductCard />
          </div>
        </div>
      </section>

      {/* Traveler testimonials - optional section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Hear from people who've used our service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I was able to get items from Japan that were impossible to find here. The process was smooth and my traveler was really helpful!"
              </p>
              <div className="font-medium">Sarah T.</div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a traveler, I've made extra money bringing items to people while on business trips. Great platform!"
              </p>
              <div className="font-medium">Michael R.</div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Got my limited edition sneakers from the US for much less than what resellers were charging. Highly recommend!"
              </p>
              <div className="font-medium">James L.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductRequestsPage;