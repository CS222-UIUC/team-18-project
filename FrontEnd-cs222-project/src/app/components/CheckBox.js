"use client"
import React, {useState} from 'react'
import Image from "next/image";



const CheckBox = ({checkSet}) => {
    const [checked, setChecked] = useState(checkSet);

    const handleClick = () => {
        setChecked(prevChecked => !(prevChecked));
    };
    
    return (<Image onClick={handleClick} src={checked === true ? "/Checked_Box.png" : "/Unchecked_Box.png"} alt="Next.js logo" width={20} height={20} priority /> 
    );
};



export default CheckBox;