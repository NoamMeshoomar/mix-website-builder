import { useEffect, useRef } from "react";

interface Props {
    content: string,
    editable: boolean
}

const Text = ({content, editable}: Props) => {
    const inputRef = useRef<any>(null);

    // useEffect(() => {
    //     inputRef.current.select();
    // }, [inputRef]);

    return <>
        {!editable ? <h1>{content}</h1> : <form>
            <input type="text" value={content} onChange={(e) => console.log(e.target.value)} ref={inputRef} />
        </form>}
    </>
}

export default Text;