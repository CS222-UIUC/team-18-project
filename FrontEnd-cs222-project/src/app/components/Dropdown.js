"use client"
import React, {useState} from 'react'
// import Image from "next/image";
import CheckBox from "./CheckBox.js";


const DropdownItem = ({word}) => {
  return ( 
    <span style={{color: "black", display: "flex", align_items: "center", padding: "10px", border: "1px solid black", width: "25%", margin: "0 auto"}}>{word} {"\u00A0"} {"\u00A0"} <CheckBox /> </span> 
  );
};


function Dropdown({ title , words }) {
  const [open, setOpen] = useState(false);
  
  const handleClick = () => {
    setOpen(prevOpen => !(prevOpen));
  };

  return ( <div> <span onClick={handleClick} style={{color: "black", display: "flex", align_items: "center", padding: "10px", border: "1px solid black", width: "25%", margin: "0 auto"}}> { title } </span>
    {open && 
    <ul>
      {words.map((wordi, index) => (<li key={index}> <DropdownItem word={wordi} /> </li>))}
    </ul> }
    </div>
  );
}



export default Dropdown;