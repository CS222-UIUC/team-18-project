"use client";
import React from 'react';

function MinorPercentList({minors, percentages}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Segoe UI, Helvetica, sans-serif",
        marginTop: "40px",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        {minors.map((word, index) => (
          <li
            key={index}
            style={{
              margin: "8px 0",
              fontSize: "18px",
              color: "#333",
              backgroundColor: "#f2f2f2",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Percentage {word} Completed: {percentages[index]}%
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default MinorPercentList;