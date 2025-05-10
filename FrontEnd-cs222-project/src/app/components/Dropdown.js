"use client"
import React, {useState, useEffect, useRef} from 'react'
// import Image from "next/image";
//import CheckBox from "./CheckBox.js";
import DropdownItem from "./DropdownItem.js";




// const DropdownItem = ({word}) => {
//   // return ( 
//   //   <span style={{color: "black", display: "flex", align_items: "center", padding: "10px", border: "1px solid black", width: "25%", margin: "0 auto"}}>{word} {"\u00A0"} {"\u00A0"} <CheckBox /> </span> 
//   // );
//   return (
//     <span
//       style={{
//         display: "flex",
//         alignItems: "center",
//         padding: "10px",
//         borderBottom: "1px solid #ddd",
//         color: "#333",
//         width: "100%",
//         backgroundColor: "#fff",
//         cursor: "pointer",
//         transition: "background-color 0.2s, coluseStateor 0.2s",
//       }}
//     >
//       {word} {"\u00A0"} {"\u00A0"} <CheckBox />
//     </span>
//   );
// };



function Dropdown({ title , words, initial, sendDataToParent, className}) {
  const [open, setOpen] = useState(false);
  const [checkedState, setChecked] = useState(initial);
  const dropdownRef = useRef(null);
  //setChecked(initial);
useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setOpen(false);
    setChecked(initial);
  }, []);

  //useEffect(() => {
  //  if (open && initial !== checkedState) {
 //     setChecked(initial);
 //   }
  //}, [open, initial]);

  if (open && initial !== checkedState) {
    setChecked(initial);
  }
  
  //const [checkedState, setChecked] = useState(initial);
  //const [start, setStart] = useState(true);

  // var checked_or_not = [];
  // var count = false;
  
  // for (let i = 0; i < words.length; i++) {
  //   checked_or_not.push(count);
  //   count = !count;
  // }


  const toggleCheck = (index) => {
    const updated = [...checkedState];
    updated[index] = !updated[index];
    setChecked(updated);
    sendDataToParent(updated);
  }

  const handleClick = () => {
    // for (let i = 0; i < checked_or_not.length; i++) {
    //   checked_or_not[i] = true;
    // }
    setOpen(prevOpen => !(prevOpen));
    setChecked(initial);
  };


  // return ( <div> <span onClick={handleClick} style={{color: "black", display: "flex", align_items: "center", padding: "10px", border: "1px solid black", width: "25%", margin: "0 auto"}}> { title } </span>
  //   {open && 
  //   <ul>
  //     {words.map((wordi, index) => (<li key={index}> <DropdownItem word={wordi} /> </li>))}
  //   </ul> }
  //   </div>
  // );
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div ref={dropdownRef} style={{ position: "relative", display: "inline-block", width: "250px" }}>
        <span
          onClick={handleClick}
          style={{
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
          }}
        >
          {title}
        </span>
        {open && (
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "5px 0 0 0",
              backgroundColor: "#13294B",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              position: "absolute",
              width: "100%",
              zIndex: "300",
              maxHeight: "200px",
              overflowY: "auto",
              scrollbarWidth: "thin",
            }}
          >
            {words.map((word, index) => (
              <li key={index}>
                <DropdownItem
                  word={word}
                  isChecked={checkedState[index]}
                  onToggle={() => toggleCheck(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


export default Dropdown;