import { Fragment, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CollapseList from "../CollapseList/CollapseList";
import CollapseItem from "../CollapseItem/CollapseItem";
import Tab from "../Tab/Tab";
import tabs from "../../helpers/tabsData";
import TextEditor from "../TextEditor/TextEditor";

import "./EditorSidebar.css";

const EditorPanel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeCollapse, setActiveCollapse] = useState<number | null>(null);

    const dispatch = useDispatch();

    const elementSelected = useSelector((state: RootStateOrAny) => state.editor.selectedElement);

    useEffect(() => {
        if(elementSelected) {
            setActiveTab(1);
            setActiveCollapse(null);
        } else {
            setActiveTab(0);
            setActiveCollapse(null);
        }
    }, [elementSelected]);

    const handleActiveTab = (index: number) => {
        setActiveTab(index);
        setActiveCollapse(null);
    }

    const handleActiveCollapse = (index: number) => {
        setActiveCollapse(prev => prev === index ? null : index);
    }

    return(
        <div className="EditorSidebar">
            <div className="tabs">
                {tabs.map((tab, index) => <Tab key={tab.id} index={index} active={activeTab === index} icon={tab.icon} onClick={handleActiveTab} />)}
            </div>
            <div className="collapse-lists">
                {tabs[activeTab].collapses.map((collapse, index) => {
                    return(
                        <Fragment key={collapse.id}>
                            <CollapseList index={index} active={activeCollapse === index} name={collapse.name} onClick={handleActiveCollapse}>
                                <div className={activeCollapse === index ? "collapse-items active" : "collapse-items"}>
                                    {activeCollapse === index && collapse.data.map((item: string) => <CollapseItem key={item}>{item}</CollapseItem>)}
                                </div>
                            </CollapseList>
                            {(activeTab === 1 && elementSelected && elementSelected.type === "text") && <TextEditor />}
                            {/* {(activeTab === 1 && elementSelected && elementSelected.type === "image") && <div className="element-properties">
                                <input type="file" />
                                <select onChange={handleTextPosition}>
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>} */}
                        </Fragment>
                    )
                })}
            </div>
            <Link to="/website" className="publish-btn" onClick={() => dispatch({type: "UNSELECT_ELEMENT"})}>Publish Website</Link>
        </div>
    )
}

export default EditorPanel;