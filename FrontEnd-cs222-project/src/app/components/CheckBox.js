"use client"
import React from 'react'

import Image from "next/image";




const CheckBox = ({ checked, onToggle }) => {
    return (
      <span onClick={onToggle} style={{ cursor: "pointer" }}>
        <Image
          src={checked ? "/Checked_Box.png" : "/Unchecked_Box.png"}
          alt="checkbox"
          width={20}
          height={20}
          priority
        />
      </span>
    );
  };


export default CheckBox;