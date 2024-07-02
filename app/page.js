"use client";

import Link from "next/link";
import Navbar from "./components/navbar";
import PageButton from "./components/page-button";
// import NewSample from "./components/new-sample";
import newTest from "./components/new-test";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";

export default function LandingPage() {
  // const { user } = useUserAuth();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPageType, setSelectedPageType] = useState(null);

  const pageTypes = ["New Sample", "Find Sample", "New Test", "Find Test"];

  // useEffect(() => {
  //   // Check every 5 seconds if user is logged in
  //   const interval = setInterval(() => {
  //     if (!user) {
  //       router.push("/");
  //     }
  //   }, 500); // Adjust interval as needed

  //   // Clear interval on component unmount
  //   return () => clearInterval(interval);
  // }, [user]);

  // useEffect(() => {
  //   // Set initial login status
  //   setIsLoggedIn(!!user);
  // }, [user]);

  // if (!isLoggedIn) {
  //   return (
  //     <div classname="mt-16">
  //       <p>redirecting...</p>
  //     </div>
  //   );
  // }

  return (
    <main>
      <Navbar />
      <div className="page-container">
        <div className="page-pop">
          <div className="flex flex-col justify-center mt-16">
            <div className="flex justify-center ml-6">
              {pageTypes.map((pageType) => (
                <PageButton
                  key={pageType}
                  page={pageType}
                  onClick={() => setSelectedPageType(pageType)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 bg-yellow-400 p-6 w-full max-w-screen-lg mx-auto mt-8">
              <p className="text-black text-xl">
                This Section No Longer Functions
              </p>
              {/* New Sample Button */}
              <Link
                href="/pages/input/new-sample"
                className="flex items-center justify-center bg-gray-300 text-black font-indie-flower py-8 mr-4 rounded-md border border-black hover:bg-gray-400 text-4xl"
              >
                <FaFlaskVial className="text-6xl mr-4" />
                New Sample
              </Link>

              {/* Find Sample Button */}
              <Link
                href="/pages/output/find-sample"
                className="flex items-center justify-center bg-gray-300 text-black font-indie-flower py-8 ml-4 rounded-md border border-black hover:bg-gray-400 text-4xl"
              >
                <HiDocumentSearch className="text-6xl mr-4" />
                Find Sample
              </Link>

              <Link
                href="/pages/input/new-test"
                className="flex items-center justify-center bg-gray-300 text-black font-indie-flower py-8 ml-4 rounded-md border border-black hover:bg-gray-400 text-4xl"
              >
                <HiDocumentSearch className="text-6xl mr-4" />
                New Test
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
