const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['image', 'video'],

    ['clean']                                         // remove formatting button
];

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
    'image','video',
    'align'
]


export const modules = {
    toolbar: toolbarOptions,
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};



/**
 **Font
 **Font size
 **Text color / bacground color
 **Bold/Italic/Underline/Cross
 **Listy
 **Links Image Video
 */



export const QuillToolbar = () => {
    return (
        <div id="toolbar">

        </div>)
}

export default QuillToolbar;