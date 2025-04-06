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
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      margin: "20px 0",
      position: "relative", 
      zIndex: 100
    }}>
      <div style={{ width: "400px" }}>
        {/* Trigger Button */}
        <div
          onClick={handleClick}
          style={{
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#13294B",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 100
          }}
        >
          {selected || title}
        </div>

        {/* Dropdown List */}
        {open && (
          <ul
            style={{
              listStyle: "none",
              margin: "5px 0 0 0",
              padding: 0,
              position: "absolute",
              backgroundColor: "#fff",
              width: "400px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              maxHeight: "200px",
              overflowY: "auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              zIndex: 200
            }}
          >
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleOptionClick(option)}
                style={{
                  padding: "12px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  backgroundColor: "#fff",
                  color: "#000",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
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