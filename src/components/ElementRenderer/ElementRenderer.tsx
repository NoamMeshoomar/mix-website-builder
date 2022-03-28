import { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Text from "../EditorElements/Text";
import Paragraph from "../EditorElements/Paragraph";
import Image from "../EditorElements/Image";
import "./ElementRenderer.css";

interface Settings {
    align: any
}

interface Props {
    element: {
        id: number,
        type: string,
        component: string,
        content: any,
        innerContent: object,
        settings: Settings
    }
}

const components: any = {
    text: Text,
    paragraph: Paragraph,
    image: Image
}

const isSameId = (elemOne: any, elemTwo: any) => {
    return elemOne?.toString() === elemTwo?.toString() ? true : false;
}

const ElementRenderer = ({element}: Props) => {
    const [editable, setEditable] = useState(false);

    const {id, type, component, content, settings} = element;

    const elemRef = useRef<any>(null);

    const selectedElement = useSelector((state: RootStateOrAny) => state.editor.selectedElement);
    const draggedElement = useSelector((state: RootStateOrAny) => state.editor.draggedElement);

    const dispatch = useDispatch();

    const location = useLocation();

    const isEditable = location.pathname !== "/website";

    const handleSelectElement = () => {
        if(!isEditable)
            return;
        dispatch({type: "SELECT_ELEMENT", payload: id});
    }

    const handleUnselectElement = useCallback((e) => {
        if(!isEditable)
            return;
        let clickedInside = false;
        for(let i = 0; i < e.path.length; i++) {
            const elem = e.path[i];
            if(elem.className === "WebsiteEditor") {
                clickedInside = true;
                break;
            }
        }
        const clickedElementId = e.target.parentNode?.attributes["data-id"]?.nodeValue;
        if(clickedInside && selectedElement) {
            if(!clickedElementId)
                return dispatch({type: "UNSELECT_ELEMENT"});
            if(!isSameId(selectedElement?.id, clickedElementId)) {
                dispatch({type: "SELECT_ELEMENT", payload: +clickedElementId});
            }
        }
    }, [selectedElement, isEditable, dispatch]);
    
    const handleMouseOver = () => {
        if(!isEditable)
            return;
        if(!isSameId(selectedElement?.id, id) && !draggedElement)
            elemRef.current.classList.add("mark-hovered");
    }

    const handleMouseLeave = () => {
        if(!isEditable)
            return;
        if(!isSameId(selectedElement?.id, id))
            elemRef.current.classList.remove("mark-hovered");
    }

    const handleDragStart = (e: any) => {
        if(!isEditable)
            return;
        elemRef.current.classList.add("mark-selected");
        elemRef.current.style.opacity = .5;
        e.dataTransfer.setData("text/plain", `["DROP_ELEMENT", "${id}"]`);
        dispatch({type: "DRAG_ELEMENT", payload: id});
    }

    const handleDragEnd = () => {
        if(!isEditable)
            return;
        !isSameId(id, selectedElement?.id) && elemRef.current.classList.remove("mark-selected");
        elemRef.current.style.opacity = 1;
    }

    const handleRemoveElement = () => {
        if(!isEditable)
            return;
        dispatch({type: "REMOVE_ELEMENT", payload: id});
    }

    useEffect(() => {
        window.addEventListener("click", handleUnselectElement);
        return () => window.removeEventListener("click", handleUnselectElement);
    }, [handleUnselectElement]);

    const Component = components[component];

    return(
        <div 
            data-editor-elem="true"
            data-id={id}
            data-type={type}
            className={selectedElement && isSameId(selectedElement.id, id) ? "ElementRenderer mark-selected" : "ElementRenderer"}
            draggable={isEditable ? true : false}
            onClick={handleSelectElement}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            style={{
                textAlign: settings.align
            }}
            ref={elemRef}
        >
            {selectedElement && isSameId(selectedElement.id, id) && <div className="edit-options">
                <button onClick={handleRemoveElement}>🗑️</button>
                {type === "text" && <button onClick={() => setEditable(prev => !prev)}>✍</button>}
            </div>}
            <Component id={id} content={element.content} editable={editable}>
                {content}
            </Component>
        </div>
    )
}

export default ElementRenderer;