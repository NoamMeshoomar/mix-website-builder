import "./CollapseItem.css";

interface Props {
    children: any
}

const CollapseItem = ({children}: Props) => {
    const handleDragStart = (e: any) => {
        e.dataTransfer.setData("text/plain", `["ADD_ELEMENT", "${children}"]`);
    }

    return(
        <div className="CollapseItem" draggable onDragStart={handleDragStart}>
            {children}
        </div>
    )
}

export default CollapseItem;