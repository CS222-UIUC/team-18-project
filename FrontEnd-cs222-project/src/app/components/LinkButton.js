"use client";
import React, { useState } from "react";
//import { Link } from 'react-router-dom';

function LinkButton() {
    const [pushed, setPushed] = useState(false);

    const handleClick = () => {
        setPushed(prevPushed => !(prevPushed));
        
    };

    return (
        <div><h1 onClick={handleClick} style={{color: 'black'}}>Link to next page</h1>
        </div>
    )
}

export default LinkButton