import React from 'react'
import CheckBox from "./CheckBox.js";



const DropdownItem = ({word, isChecked, onToggle, zIndexMain}) => {
  
    return ( 
      <span 
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        color: "#333",
        width: "100%",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "background-color 0.2s, coluseStateor 0.2s",
        zIndex: 4,
      }}>
        {word} {"\u00A0"} {"\u00A0"} 
        <CheckBox checked={isChecked} onToggle = {onToggle} />
      </span> 
    );
};



export default DropdownItem;