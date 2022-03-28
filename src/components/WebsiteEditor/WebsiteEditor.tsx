import { useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ElementRenderer from "../ElementRenderer/ElementRenderer";
import "./WebsiteEditor.css";

const WebsiteEditor = () => {
    const websiteEditorRef = useRef(null);

    const elements = useSelector((state: RootStateOrAny) => state.editor.elements);
	const draggedElement = useSelector((state: RootStateOrAny) => state.editor.draggedElement);

    const dispatch = useDispatch();

    const handleDragOver = (e: any) => {
        e.preventDefault();
		const targetRect = e.target.getBoundingClientRect();
		const targetElementId = +e.target.parentNode?.attributes["data-id"]?.nodeValue;
		const targetIndex = elements.findIndex((element: any) => element.id === targetElementId);
		if(targetElementId) {
			if((e.clientY < targetRect.top+20) || (e.clientY > targetRect.top && elements[targetIndex+1]?.id !== draggedElement.id)) {
				dispatch({type: "MOVE_ELEMENT", payload: targetElementId});
			}
		}
    }

    const handleDropElement = (e: any) => {
        e.preventDefault();
        const [type, data] = JSON.parse(e.dataTransfer.getData("text/plain"));
        dispatch({type, payload: data});
        e.dataTransfer.clearData();
    }

    return(
        <div className="WebsiteEditor" onDrop={handleDropElement} onDragOver={handleDragOver} ref={websiteEditorRef}>
            {elements.map((element: any) => {
                return <ElementRenderer key={element.id} element={element} />
            })}
        </div>
    )
}

export default WebsiteEditor;