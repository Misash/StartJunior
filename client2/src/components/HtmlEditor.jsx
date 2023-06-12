import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function HtmlEditor({setTextEditor}) {

 
  const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],

    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ indent: '-1'}, { indent: '+1' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
   
    ],
  }
  const { quill, quillRef } = useQuill({modules});



  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        // console.log(quillRef.current.firstChild.innerHTML); // Get text only
        setTextEditor(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);



  return (
    <div>
      <div style={{ width: "100%", height: "100%" , backgroundColor: "white" , color : "black"}}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default HtmlEditor;
