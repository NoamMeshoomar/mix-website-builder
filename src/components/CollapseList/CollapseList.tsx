import { Fragment, useEffect, useState } from "react";

import ArrowPNG from "../../assets/Editor/arrow.png";

import "./CollapseList.css";

interface Props {
    index: number,
    active: boolean,
    name: string,
    onClick: Function,
    children: any
}

const CollapseList = ({index, active, name, onClick, children}: Props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(true);
        }, index * 300);

        return () => clearTimeout(timeout);
    }, [index]);

    return(
        <Fragment>
            <div
                className={active ? "CollapseList active" : "CollapseList"}
                style={show ? {visibility: "visible", animation: "SlideRight 300ms ease"} : {visibility: "hidden"}} 
                onClick={() => onClick(index)}
            >
                <h3 style={{fontSize: 20, fontWeight: 400, color: "var(--dark-grey-color)"}}>{name}</h3>
                <img src={ArrowPNG} width={8} alt="arrow" />
            </div>
            {children}
        </Fragment>
    )
}

export default CollapseList;