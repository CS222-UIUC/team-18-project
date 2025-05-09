"use client";
import React, { useState } from "react";

function MajorDropdown({ title, options, handleSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => setOpen(!open);

  const handleOptionClick = (option) => {
    setSelected(option);
    setOpen(false);
    handleSelect(option);
    console.log("Major Selected:", option);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", display: "inline-block", width: "250px" }}>
      <span
        onClick={handleClick}
        style={{
          color: "black",
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#13294B",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          justifyContent: "center",
        }}>
        {selected || title}
      </span>

      {/* Dropdown List */}
      {open && (
        <ul
          className="absolute left-0 w-full mt-1 bg-white border border-[#ccc] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50"
          style={{ top: "100%" }} 
        >
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleOptionClick(option)}
              className="px-6 py-4 cursor-pointer border-b border-[#eee] hover:bg-[#f5f5f5] transition-colors"
              style={{ color: "#13294B", fontSize: "16px" }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default MajorDropdown;
