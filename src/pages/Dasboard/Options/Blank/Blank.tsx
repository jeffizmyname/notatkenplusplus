import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Delta as TypeDelta, Sources } from 'quill';
import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
import EditorToolBar, { formats, modules } from "./EditorToolBar";
import { Button } from "@nextui-org/react";

const delta = (new Delta([
    {
        "attributes": {
            "color": "#e60000"
        },
        "insert": "your"
    },
    {
        "attributes": {
            "color": "#e60000",
            "bold": true
        },
        "insert": " "
    },
    {
        "attributes": {
            "bold": true
        },
        "insert": "text"
    },
    {
        "insert": "\n"
    },
]) as unknown) as TypeDelta;

export default function MyComponent() {
    const [value, setValue] = useState(delta);
    const onEditorChange = (value: string, delta: TypeDelta, source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
        setValue(editor.getContents());
    };

    const handleSave = () => {
        // Get the current contents of the editor
        const editorContents = value;
        // Do something with the contents, e.g., save it to a database or perform further processing
        console.log("Saved content:", editorContents);
        // Add your save logic here
        //!zapisz to jakos do bazy danych a potem da sie oczytac ta deltą czy coś XD
    };

    return (
    <div>
        <EditorToolBar/>
        <ReactQuill 
        theme="snow"
        value={value} 
        onChange={onEditorChange}
        modules={modules}
        formats={formats}
        />
        <Button onClick={handleSave}>Save</Button>
    </div>);
}

