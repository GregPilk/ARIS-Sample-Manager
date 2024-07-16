"use client";

import Link from "next/link";
import Navbar from "./components/navbar";
import PageButton from "./components/page-button";
import NewSample from "./components/new-sample";
import NewTest from "./components/new-test";
import FindSample from "./components/find-sample";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [selectedPageType, setSelectedPageType] = useState(null);

  const pageTypes = [
    "New Chain of Custody",
    "Find Chain of Custody",
    "Test Data",
  ];

  const renderPageComponent = () => {
    switch (selectedPageType) {
      case "New Chain of Custody":
        return <NewSample page={selectedPageType} />;
      case "Test Data":
        return <NewTest />;
      case "Find Chain of Custody":
        return <FindSample page={selectedPageType} />;
      // case "Find Test":
      //   return <FindTest />;
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
