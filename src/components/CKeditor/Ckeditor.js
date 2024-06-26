import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "antd";

const Ckeditor = () => {
  const [editorData, setEditorData] = useState("");
  const [capturedData, setCapturedData] = useState([]);

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default Ckeditor;
// import React, { useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Button } from "antd";

// const Ckeditor = () => {
//   const [editorData, setEditorData] = useState("");
//   const [capturedData, setCapturedData] = useState([]);

//   return (
//     <div>
//       <CKEditor
//         editor={ClassicEditor}
//         data={editorData}
//         config={{
//           ckfinder: {
//             // Upload the images to the server using the CKFinder QuickUpload command.
//             uploadUrl: "/uploads", // Replace with your upload URL
//           },
//           toolbar: [
//             "heading",
//             "|",
//             "bold",
//             "italic",
//             "link",
//             "bulletedList",
//             "numberedList",
//             "blockQuote",
//             "|",
//             "insertTable",
//             "tableColumn",
//             "tableRow",
//             "mergeTableCells",
//             "|",
//             "undo",
//             "redo",
//             "imageUpload",
//           ],
//           image: {
//             toolbar: [
//               "imageTextAlternative",
//               "imageStyle:full",
//               "imageStyle:side",
//             ],
//           },
//         }}
//         onReady={(editor) => {
//           console.log("Editor is ready to use!", editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           setEditorData(data);
//           console.log({ event, editor, data });
//         }}
//         onBlur={(event, editor) => {
//           console.log("Blur.", editor);
//         }}
//         onFocus={(event, editor) => {
//           console.log("Focus.", editor);
//         }}
//       />
//     </div>
//   );
// };

// export default Ckeditor;

// import { useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// const Ckeditor = () => {
//   const editorRef = useRef(null);
//   const log = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };
//   return (
//     <>
//       <Editor
//         apiKey="5d2y3zf8wlhf87r8skypp8mpa5vhqauabzqo2nfa85qbexnv"
//         onInit={(_evt, editor) => (editorRef.current = editor)}
//         initialValue="<p>This is the initial content of the editor.</p>"
//         init={{
//           height: 500,
//           menubar: false,
//           plugins: [
//             "advlist",
//             "autolink",
//             "lists",
//             "link",
//             "image",
//             "charmap",
//             "preview",
//             "anchor",
//             "searchreplace",
//             "visualblocks",
//             "code",
//             "fullscreen",
//             "insertdatetime",
//             "media",
//             "table",
//             "code",
//             "help",
//             "wordcount",
//           ],
//           toolbar:
//             "undo redo | blocks | " +
//             "bold italic forecolor | alignleft aligncenter " +
//             "alignright alignjustify | bullist numlist outdent indent | " +
//             "removeformat | help",
//           content_style:
//             "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//         }}
//       />
//       <button onClick={log}>Log editor content</button>
//     </>
//   );
// };
// export default Ckeditor;
// import React, { useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// const Ckeditor = () => {
//   const editorRef = useRef(null);

//   const log = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };

//   return (
//     <>
//       <Editor
//         apiKey="5d2y3zf8wlhf87r8skypp8mpa5vhqauabzqo2nfa85qbexnv" // Replace with your actual API key
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         initialValue="<p>This is the initial content of the editor.</p>"
//         init={{
//           height: 500,
//           menubar: false,
//           plugins: [
//             "advlist autolink lists link image charmap preview anchor",
//             "searchreplace visualblocks code fullscreen",
//             "insertdatetime media table code help wordcount",
//           ],
//           toolbar:
//             "undo redo | formatselect | " +
//             "bold italic backcolor | alignleft aligncenter " +
//             "alignright alignjustify | bullist numlist outdent indent | " +
//             "removeformat | image media | help",
//           content_style:
//             "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//           images_upload_url: "your-image-upload-endpoint", // Replace with your server endpoint
//           images_upload_handler: function (blobInfo, success, failure) {
//             const xhr = new XMLHttpRequest();
//             xhr.withCredentials = false;
//             xhr.open("POST", "your-image-upload-endpoint"); // Replace with your server endpoint

//             xhr.onload = function () {
//               if (xhr.status !== 200) {
//                 failure("HTTP Error: " + xhr.status);
//                 return;
//               }

//               const json = JSON.parse(xhr.responseText);

//               if (!json || typeof json.location !== "string") {
//                 failure("Invalid JSON: " + xhr.responseText);
//                 return;
//               }

//               success(json.location);
//             };

//             const formData = new FormData();
//             formData.append("file", blobInfo.blob(), blobInfo.filename());

//             xhr.send(formData);
//           },
//         }}
//       />
//       <button onClick={log}>Log editor content</button>
//     </>
//   );
// };

// export default Ckeditor;
