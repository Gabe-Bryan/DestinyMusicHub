import React from 'react';

export default function AutoScalingText ({children}) {
    const test = () =>{
        console.log("hi");
    };
    
    return <div onchange={test}>{children}</div>
}