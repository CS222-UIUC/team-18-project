"use client";
import React, { useState } from "react";

function LinkButton() {
  const [setPushed] = useState(false);

  const handleClick = () => {
    setPushed(prevPushed => !prevPushed);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          color: 'white',
          backgroundColor: '#007bff',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          userSelect: 'none',
          fontSize: '1.2rem',
          border: 'none',
        }}
      >
        Link to next page
      </button>
    </div>
  );
}

export default LinkButton;
