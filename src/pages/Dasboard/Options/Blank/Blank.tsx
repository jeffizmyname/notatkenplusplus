import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import { Delta as TypeDelta, Sources } from 'quill';
import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
import EditorToolBar, { formats, modules } from "./EditorToolBar";
import { getElements, handleSave } from "../../../../utils/saveLoad";
import { getId } from "../../../../utils/userData";
import "./Blankstyle.css"

let delta = (new Delta([
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

interface Note {
    id: number;
    user_id: number;
    Name: string;
    Author: string;
    Description: string;
    Data: Record<string, unknown> | null;
}


export default function MyComponent() {
    const Blankid = useParams()
    const [NoteData, setNoteData] = useState<Note | null>(null);
    const [value, setValue] = useState(delta);

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getElements("blank", getId()!)
                const resultObject = userData.find((item: Note) => item.id === Number(Blankid.blankID));
                setNoteData(resultObject);
                console.log(resultObject)
                if (resultObject && resultObject.Data) {
                    const unescapedString = resultObject.Data.replace(/\\"/g, '"');
                    const jsonArray = JSON.parse(unescapedString);
                    delta = (new Delta(jsonArray) as unknown) as TypeDelta;
                    setValue(delta);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, [Blankid.blankID]);

    const onEditorChange = (_value: string, _delta: TypeDelta, _source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
        setValue(editor.getContents());
    };

    const HandleSave = () => {
        const editorContents = value;
        console.log("Saved content:", editorContents);
        handleSave("blank", editorContents, NoteData)
    };

    return (
    <div className="lg:mx-10 lg:my-5">
        <EditorToolBar onSave={HandleSave}/>
        <ReactQuill 
        theme="snow"
        value={value} 
        onChange={onEditorChange}
        modules={modules}
        formats={formats}
        />
    </div>);
}

