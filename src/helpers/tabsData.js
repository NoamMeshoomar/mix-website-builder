import generateId from "./generateId";

const tabs = [
    {
        id: generateId(),
        icon: '✚',
        collapses: [
            {
                id: generateId(),
                name: "Sections",
                data: []
            },
            {
                id: generateId(),
                name: "Elements",
                data: ["text", "paragraph", "image"]
            },
            {
                id: generateId(),
                name: "Widgets",
                data: []
            }
        ]
    },
    {
        id: generateId(),
        icon: '✎',
        collapses: [
            {
                id: generateId(),
                name: "Wap Preferences",
                data: []
            }
        ]
    }
];

export default tabs;