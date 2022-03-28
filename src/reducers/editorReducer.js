import generateId from "../helpers/generateId";
import DEFAULT_IMAGE from "../assets/Editor/background.png";

const DEFAULT_ELEMENTS = {
    text: {
        id: null,
        type: "text",
        component: "text",
        content: "Edit Text",
        innerContent: null,
        settings: {
            align: "left"
        }
    },
    paragraph: {
        id: null,
        type: "text",
        component: "paragraph",
        content: "Default paragraph text, Lorem ipsum dolur iram.",
        innerContent: null,
        settings: {
            align: "left"
        }
    },
    image: {
        id: null,
        type: "image",
        component: "image",
        content: DEFAULT_IMAGE,
        innerContent: null,
        settings: {
            align: "left"
        }
    }
}

const INITIAL_STATE = {
    elements: [],
    selectedElement: null,
    draggedElement: null
}

const editorReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SELECT_ELEMENT":
            const _selectedElementIndex = state.elements.findIndex(element => element.id === action.payload);
            return {...state, selectedElement: state.elements[_selectedElementIndex]}
        case "UNSELECT_ELEMENT":
            return {...state, selectedElement: null}
        case "DRAG_ELEMENT":
            const elementIndex = state.elements.findIndex(element => element.id === action.payload);
            return {
                ...state, 
                draggedElement: state.elements[elementIndex]
            }
        case "MOVE_ELEMENT":
            const draggedElementIndex = state.elements.findIndex(element => element.id === state.draggedElement.id);
            const targetElementIndex = state.elements.findIndex(element => element.id === action.payload);
            const newElements = [...state.elements];
            newElements.splice(draggedElementIndex, 1);
            newElements.splice(targetElementIndex, 0, state.elements[draggedElementIndex]);
            return {...state, elements: newElements}
        case "DROP_ELEMENT":
            return {...state, draggedElement: null};
        case "ADD_ELEMENT":
            const type = action.payload;
            return {...state, elements: [...state.elements, {...DEFAULT_ELEMENTS[type], settings: {...DEFAULT_ELEMENTS[type].settings}, id: generateId()}]}
        case "REMOVE_ELEMENT":
            const filteredElements = state.elements.filter(element => element.id !== action.payload);
            return {...state, elements: filteredElements}
        case "TEXT_ALIGN":
            const selectedElementIndex = state.elements.findIndex(element => element.id === state.selectedElement.id);
            const newStateElements = [...state.elements];
            newStateElements[selectedElementIndex].settings.align = action.payload;
            return {...state, elements: newStateElements}
        default:
            return state;
    }
}

export default editorReducer;