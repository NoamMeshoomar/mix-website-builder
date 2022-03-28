import { combineReducers } from "redux";
import editorReducer from "./editorReducer";

const allReducers = combineReducers({
    editor: editorReducer
});

export default allReducers;