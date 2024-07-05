"use client";

import Link from "next/link";
import Navbar from "./components/navbar";
import PageButton from "./components/page-button";
import NewSample from "./components/new-sample";
import NewTest from "./components/new-test";
import FindSample from "./components/find-sample";
import FindTest from "./components/find-test";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";

export default function Dashboard() {
  const [selectedPageType, setSelectedPageType] = useState(null);

  const pageTypes = ["New Sample", "Find Sample", "New Test", "Find Test"];

  const renderPageComponent = () => {
    switch (selectedPageType) {
      case "New Sample":
        return <NewSample page={selectedPageType} />;
      case "New Test":
        return <NewTest />;
      case "Find Sample":
        return <FindSample page={selectedPageType} />;
      case "Find Test":
        return <FindTest />;
      default:
        return null; // Or any default component you wish to show
    }
  };

  return (
    <main>
      <Navbar pages={pageTypes} onNavigate={setSelectedPageType} />
      {selectedPageType === null ? (
        <div>
          <div className="page-container">
            <div className="page-pop px-16">
              <div className="flex justify-center">
                <header className="title">
                  <h1>Dashboard</h1>
                </header>
              </div>
              <div className="flex justify-center">
                <div className="page-button-container mb-16">
                  {pageTypes.map((pageType) => (
                    <PageButton
                      key={pageType}
                      page={pageType}
                      onClick={() => setSelectedPageType(pageType)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        renderPageComponent()
      )}
    </main>
  );
}
