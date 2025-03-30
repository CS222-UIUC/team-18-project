"use client"
import React, {useState} from 'react'
// import Image from "next/image";
import DropdownItem from "./DropdownItem.js";





function Dropdown({ title , words }) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(true);

  var checked_or_not = [];
  var count = false;
  
  words.forEach(function (item) {
    checked_or_not.push(count);
    count = !count;
  });

  

  const handleClick = () => {
    checked_or_not.forEach( function (item) {
      checked_or_not[0] = true;
    });
    setOpen(prevOpen => !(prevOpen));
  };

  

  return ( <div> <span onClick={handleClick} style={{backgroundColor: '#00205B', textAlign: 'center', fontFamily: 'Merriweather, sans-serif', color: "white", display: "flex", align_items: "center", padding: "10px", border: "1px solid black", width: "25%", margin: "0 auto"}}> { title } </span>
    {open && 
    <ul>
      {words.map((wordi, index) => (<li key={index}> <DropdownItem word={wordi} checkObj={checked_or_not[index]} index={index} /> </li>))}
    </ul> }
    </div>
  );
}


export default Dropdown;