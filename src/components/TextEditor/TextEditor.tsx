import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import "./TextEditor.css";

const TextEditor = () => {
    const align = useSelector((state: RootStateOrAny) => state.editor.selectedElement.settings.align);

    const dispatch = useDispatch();

    const handleElementPosition = (e: any) => {
        dispatch({type: "TEXT_ALIGN", payload: e.target.value});
    }

    return(
        <div className="TextEditor">
            <select value={align} onChange={handleElementPosition}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
            </select>
        </div>
    )
}

export default TextEditor;