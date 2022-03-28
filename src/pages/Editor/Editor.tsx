import EditorPanel from "../../components/EditorSidebar/EditorSidebar";
import WebsiteEditor from "../../components/WebsiteEditor/WebsiteEditor";
import "./Editor.css";

const Editor = () => {
    return(
        <div className="Editor">
            <EditorPanel />
            <WebsiteEditor />
        </div>
    )
}

export default Editor;