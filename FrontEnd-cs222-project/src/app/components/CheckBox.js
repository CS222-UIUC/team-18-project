"use client"
import React from 'react'

import Image from "next/image";




const CheckBox = ({ checked, onToggle }) => {
    //const [checked, setChecked] = useState(false);

    // const handleClick = () => {
    //     //setChecked(prevChecked => !(prevChecked));
    //     onToggle();
    // };
  
    return (
        //<Image onClick={handleClick} src={checked === true ? "/Checked_Box.png" : "/Unchecked_Box.png"} alt="Next.js logo" width={20} height={20} priority /> 
        <div onClick={onToggle}>
            <Image
                src={checked ? "/Checked_Box.png" : "/Unchecked_Box.png"}
                alt="checkbox"
                width={20} 
                height={20} 
                priority
            />
        </div>
    );
};



export default CheckBox;