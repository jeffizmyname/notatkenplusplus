import { Button } from "@nextui-org/react";

//     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
//     [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
//     [{ 'direction': 'rtl' }],                         // text direction

//     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//     [{ 'font': [] }],
//     [{ 'align': [] }],

//     ['image', 'video'],

//     ['clean'],                                       // remove formatting button
// ];

// eslint-disable-next-line react-refresh/only-export-components
export const formats = [
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'header', 'header',
    'list', 'bullet',
    'script',
    'indent',
    'direction',
    'size',
    'header',
    'color', 'background',
    'font',
    'image', 'video',
    'align'
]



// eslint-disable-next-line react-refresh/only-export-components
export const modules = {
    toolbar: "#toolbar",
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};


interface ChildComponentProps {
    onSave: () => void;
}

export const QuillToolbar: React.FC<ChildComponentProps> = ({ onSave }) => {
    return (
        <div id="toolbar">
            <button className="ql-bold" title="Bold"></button>
            <button className="ql-italic" title="Italic"></button>
            <button className="ql-underline" title="Underline"></button>
            <button className="ql-strike" title="Strikethrough"></button>

            <span className="ql-formats">
                <button className="ql-header" value="1"></button>
                <button className="ql-header" value="2"></button>
                <button className="ql-blockquote"></button>
                <button className="ql-code-block"></button>
            </span>

            <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-indent" value="-1"></button>
                <button className="ql-indent" value="+1"></button>
            </span>

            <span className="ql-formats">
                <button className="ql-script" value="sub"></button>
                <button className="ql-script" value="super"></button>
            </span>

            <span className="ql-formats">
                <button className="ql-direction" value="rtl"></button>
                <select className="ql-align"></select>
            </span>
            <select className="ql-size"></select>

            <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                <option value="1" />
                <option value="2" />
                <option value="3" />
                <option value="4" />
                <option value="5" />
                <option value="6" />
                <option selected />
            </select>

            <span className="ql-formats">
                <select className="ql-color"></select>
                <select className="ql-background"></select>
            </span>

            <span className="ql-formats">
                <select className="ql-font"></select>
            </span>

            <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
                <button className="ql-formula"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-clean"></button>
            </span>

            <span className="ql-formats">
                <Button className="all-[unset] ql-customText baton !bg-primary my-2 rounded-md" onClick={onSave} color="primary" variant="solid" value="">
                    Zapisz
                </Button>
            </span>
        </div>)
}

export default QuillToolbar;