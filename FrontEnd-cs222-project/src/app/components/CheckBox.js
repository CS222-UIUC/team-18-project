"use client"
import React, {useState} from 'react'
import Image from "next/image";



const CheckBox = () => {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked(prevChecked => !(prevChecked));
    };

    return (<Image onClick={handleClick} src={checked === true ? "/Checked_Box.png" : "/Unchecked_Box.png"} alt="Next.js logo" width={20} height={20} priority /> 
    );

    /*
    return (<div onClick={handleClick} style={{ cursor: 'pointer', padding: '10px', border: '1px solid black'}}>
        <Image src={checked === true ? "/Checked_Box.png" : "/Unchecked_Box.png"} alt="Next.js logo" width={20} height={20} priority />
    </div>);
    */
};



export default CheckBox;