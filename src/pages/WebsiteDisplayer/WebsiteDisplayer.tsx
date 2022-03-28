import { RootStateOrAny, useSelector } from "react-redux";
import ElementRenderer from "../../components/ElementRenderer/ElementRenderer";
import "./WebsiteDisplayer.css";

const WebsiteDisplayer = () => {
    const elements = useSelector((state: RootStateOrAny) => state.editor.elements);

    return(
        <div className="WebsiteDisplayer">
            {elements.map((element: any) => <ElementRenderer key={element.id} element={element} />)}
        </div>
    )
}

export default WebsiteDisplayer;