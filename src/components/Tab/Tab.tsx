import "./Tab.css";

interface Props {
    index: number,
    active: boolean,
    icon: string,
    onClick: Function
}

const Tab = ({index, active, icon, onClick}: Props) => {
    return(
        <div className={active ? "Tab active" : "Tab"} onClick={() => onClick(index)}>
            <h1>{icon}</h1>
        </div>
    )
}

export default Tab;