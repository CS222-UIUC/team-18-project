"use client";
import React from 'react';

function MinorPercentList({minors, percentages}) {
    return (<div>
        {minors.map((word, index) => (
        <li key={index} style={{ margin: "0" }}>
          {"Percentage " + word + " Completed:"}  {percentages[index] + "%"}
        </li>
      ))} </div>);
}

export default MinorPercentList;