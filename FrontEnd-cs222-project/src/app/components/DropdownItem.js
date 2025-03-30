import React from 'react'
import CheckBox from "./CheckBox.js";



const DropdownItem = ({word, checkObj, index}) => {
  
    return ( 
      <span style={{backgroundColor: '#FF5F05', fontFamily: 'Merriweather, sans-serif', fontWeight: 'bold', color: "black", display: "flex", align_items: "center", padding: "10px", border: "1px solid black", width: "25%", margin: "0 auto"}}>{word} {"\u00A0"} {"\u00A0"} <CheckBox checkSet={checkObj} /> </span> 
    );
};



export default DropdownItem;