"use client"
// components/LandingPageBody.jsx
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { se } from 'date-fns/locale';

export default function LandingPageBody() {
  const session = useSession();

  return (
    <main className="flex-grow gap-2">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#493D9E] to-[#6e61c7] text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Connecting Travelers with Buyers</h1>
              <p className="text-xl mb-6">Hewpao is your trusted middleman, bringing hard-to-find products from around the world to your doorstep.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {session.data && session.data.user ? (
                  session.data.user.is_verified ? (
                    <>
                      <Link
                        href="/order"
                        className="px-6 py-3 rounded-lg bg-white text-[#493D9E] font-medium text-center hover:bg-gray-100"
                      >
                        I'm a Buyer
                      </Link>
                      <Link
                        href="/product-requests"
                        className="px-6 py-3 rounded-lg bg-[#ffc107] text-gray-800 font-medium text-center hover:bg-[#e0a800]"
                      >
                        I'm a Traveler
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/order"
                        className="px-6 py-3 rounded-lg bg-white text-[#493D9E] font-medium text-center hover:bg-gray-100"
                      >
                        I'm a Buyer
                      </Link>
                      <Link
                        href="/verification"
                        className="px-6 py-3 rounded-lg bg-[#ffc107] text-gray-800 font-medium text-center hover:bg-[#e0a800]"
                      >
                        I'm a Traveler
                      </Link>
                    </>
                  )
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="px-6 py-3 rounded-lg bg-white text-[#493D9E] font-medium text-center hover:bg-gray-100"
                    >
                      I'm a Buyer
                    </Link>
                    <Link
                      href="/signup"
                      className="px-6 py-3 rounded-lg bg-[#ffc107] text-gray-800 font-medium text-center hover:bg-[#e0a800]"
                    >
                      I'm a Traveler
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="flex items-center justify-center h-64 md:h-96 w-full">

                <Image
                  src="/images/HP5-1.png"
                  alt="Hewpao service illustration"
                  width={300}
                  height={300}
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Service Section */}
      <section className="py-16 bg-gray-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Verification Service</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We ensure authenticity and quality by verifying products before they reach buyers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-[#493D9E] text-white rounded-full flex items-center justify-center mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Product Authentication</h3>
              <p className="text-gray-600">We verify that products are authentic and match the description provided by the seller.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-[#493D9E] text-white rounded-full flex items-center justify-center mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Quality Inspection</h3>
              <p className="text-gray-600">Each product undergoes a thorough quality check to ensure it meets our standards.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-[#493D9E] text-white rounded-full flex items-center justify-center mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Secure Delivery</h3>
              <p className="text-gray-600">Once verified, products are securely packaged and shipped to the buyer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Hewpao Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A simple process connecting travelers and buyers around the world.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-[#493D9E] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2 text-center">Buyer Makes Request</h3>
              <p className="text-gray-600 text-center">Buyers request products only available in specific locations.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-[#493D9E] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2 text-center">Traveler Accepts</h3>
              <p className="text-gray-600 text-center">Travelers heading to that location accept the request and purchase the product.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-[#493D9E] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2 text-center">Hewpao Verifies</h3>
              <p className="text-gray-600 text-center">We verify the product's authenticity and quality upon arrival.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-[#493D9E] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-2 text-center">Buyer Receives</h3>
              <p className="text-gray-600 text-center">The buyer receives their verified product and travelers earn a commission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Using Hewpao</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Why choose our platform for your global shopping needs?</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#493D9E]">For Buyers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="h-6 w-6 flex-shrink-0 text-[#493D9E] mr-2">✓</span>
                  <span>Access to exclusive products from around the world</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 flex-shrink-0 text-[#493D9E] mr-2">✓</span>
                  <span>Guaranteed authenticity through our verification process</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 flex-shrink-0 text-[#493D9E] mr-2">✓</span>
                  <span>Secure payment system and buyer protection</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#493D9E]">For Travelers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="h-6 w-6 flex-shrink-0 text-[#493D9E] mr-2">✓</span>
                  <span>Earn extra income during your travels</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 flex-shrink-0 text-[#493D9E] mr-2">✓</span>
                  <span>Flexible schedule - accept only the requests you want</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 flex-shrink-0 text-[#493D9E] mr-2">✓</span>
                  <span>No upfront costs - buyers pay in advance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#493D9E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our community of travelers and buyers connecting across the globe.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="px-8 py-3 rounded-lg bg-white text-[#493D9E] font-medium hover:bg-gray-100 text-lg">
              Sign up now
            </Link>
            {/* <Link href="/how-it-works" className="px-8 py-3 rounded-lg bg-transparent border-2 border-white font-medium hover:bg-white hover:text-[#493D9E] text-lg">
              Learn more
            </Link> */}
          </div>
        </div>
      </section>
    </main>
  );
}