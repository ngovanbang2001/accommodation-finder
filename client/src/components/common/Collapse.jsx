import * as React from "react";
import { useState } from "react";
export default function Collapse({ title, children }) {
    const [open, setOpen] = useState(true);
    const hanleClick = () => {
        setOpen(!open);
    };
    return (<div>
            <div className={'flex items-center justify-between cursor-pointer'} onClick={hanleClick}>
                <div className={'font-bold pb-1'}>{title}</div>
                <i className={`fa-regular fa-chevron-down ${open ? '-rotate-180 transition-all duration-500' : ''}`}></i>
            </div>
            <div className={`h-[0px] py-4 ${open ? 'grow-div block' : 'hidden ease-in duration-1000'}`}>
                {children}
            </div>
        </div>);
}
