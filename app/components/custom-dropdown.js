import React, { useState, useEffect, useRef } from "react";

// Added by: Greg
// Date: 2024-07-16
// Component to display a custom dropdown
// The dropdown will display a list of records
// The user can select a record from the list
// The selected record is set as the chain of custody in the parent component

const CustomDropdown = ({ allRecords, setChainOfCustody }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    if (inputValue === "") {
      setChainOfCustody(""); // Reset chainOfCustody when inputValue is empty
    }
  }, [inputValue]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (highlightedIndex !== -1 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  const filteredRecords = allRecords.filter((record) =>
    record.chainOfCustody.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleOptionClick = (value) => {
    setInputValue(value);
    setChainOfCustody(value);
    setShowOptions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent the cursor from moving
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredRecords.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent the cursor from moving
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredRecords.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        const selectedRecord = filteredRecords[highlightedIndex];
        handleOptionClick(selectedRecord.chainOfCustody);
      }
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.target.select()}
        placeholder="Enter Chain of Custody"
        required
        className="custom-drop text-black"
      />
      {showOptions && (
        <div className="absolute left-0 mt-1 border-2 rounded-lg bg-white w-80">
          {filteredRecords.map((record, index) => (
            <div
              key={record.chainOfCustody}
              onClick={() => handleOptionClick(record.chainOfCustody)}
              ref={(el) => (optionRefs.current[index] = el)}
              className={`p-2 hover:bg-slate-200 cursor-pointer ${
                index === highlightedIndex ? "bg-slate-300" : ""
              }`}
            >
              {record.chainOfCustody}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
