import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Button } from 'antd';

const Ckeditor = ({ id }) => {
  const [stepDescription, setStepDescription] = useState('');
  const [editorData, setEditorData] = useState('');

  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);

            axios
              .post('http://192.168.29.229:3004/api/process/add-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then((response) => {
                const imageUrl = response.data.url; // Assuming the response contains the image URL in `response.data.url`
                console.log(imageUrl);
                resolve({
                  default: imageUrl
                });
              })
              .catch((error) => {
                reject(error);
              });
          })
      );
    }

    abort() {
      // Handle abort
    }
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  const editorConfiguration = {
    extraPlugins: [MyCustomUploadAdapterPlugin]
  };

  const submitForm = () => {
    const payload = {
      id,
      stepDescription
    };

    console.log('Submitting form with payload:', payload);

    axios
      .patch('http://192.168.29.229:3004/api/process', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log('Response from API:', res);
      })
      .catch((error) => {
        console.error('Error while submitting form:', error);
      });
  };

  return (
    <div>
      <Button onClick={submitForm}>Add</Button>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={editorData}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log('Editor data:', data);
          setEditorData(data);
          setStepDescription(data);
        }}
        onBlur={(event, editor) => {
          console.log('Editor blurred.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Editor focused.', editor);
        }}
      />
    </div>
  );
};

export default Ckeditor;

// import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios from 'axios';
// import { Button } from 'antd';

// const Ckeditor = ({ id }) => {
//   const [stepDescription, setStepDescription] = useState('');
//   const [editorData, setEditorData] = useState('');

//   class MyUploadAdapter {
//     constructor(loader) {
//       this.loader = loader;
//     }

//     upload() {
//       return this.loader.file.then(
//         (file) =>
//           new Promise((resolve, reject) => {
//             const formData = new FormData();
//             formData.append('image', file);

//             axios
//               .post('http://192.168.29.229:3004/api/process/add-image', formData, {
//                 headers: {
//                   'Content-Type': 'multipart/form-data'
//                 }
//               })
//               .then((response) => {
//                 const imageUrl = response.data.url; // Assuming the response contains the image URL in `response.data.url`
//                 console.log('<img src="' + imageUrl + '"/>');
//                 resolve({
//                   default: imageUrl
//                 });
//               })
//               .catch((error) => {
//                 reject(error);
//               });
//           })
//       );
//     }

//     abort() {
//       // Handle abort
//     }
//   }

//   function MyCustomUploadAdapterPlugin(editor) {
//     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       return new MyUploadAdapter(loader);
//     };
//   }

//   const editorConfiguration = {
//     extraPlugins: [MyCustomUploadAdapterPlugin],
//     toolbar: {
//       items: [
//         'heading',
//         '|',
//         'bold',
//         'italic',
//         'link',
//         'bulletedList',
//         'numberedList',
//         'blockQuote',
//         'insertTable',
//         'undo',
//         'redo',
//         '|',
//         'imageUpload',
//         'mediaEmbed',
//         'removeFormat'
//       ]
//     },
//     image: {
//       toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
//     }
//   };

//   const submitForm = () => {
//     const payload = {
//       id,
//       stepDescription
//     };

//     console.log('Submitting form with payload:', payload);

//     axios
//       .patch('http://192.168.29.229:3004/api/process', payload, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       .then((res) => {
//         console.log('Response from API:', res);
//       })
//       .catch((error) => {
//         console.error('Error while submitting form:', error);
//       });
//   };

//   return (
//     <div>
//       <Button onClick={submitForm}>Add</Button>
//       <CKEditor
//         editor={ClassicEditor}
//         config={editorConfiguration}
//         data={editorData}
//         onReady={(editor) => {
//           console.log('Editor is ready to use!', editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log('Editor data:', data);
//           setEditorData(data);
//           setStepDescription(data);
//         }}
//         onBlur={(event, editor) => {
//           console.log('Editor blurred.', editor);
//         }}
//         onFocus={(event, editor) => {
//           console.log('Editor focused.', editor);
//         }}
//       />
//     </div>
//   );
// };

// export default Ckeditor;

// import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios from 'axios';
// import { Button } from 'antd';

// const Ckeditor = ({ id }) => {
//   const [stepDescription, setStepDescription] = useState('');
//   const [editorData, setEditorData] = useState('');

//   class MyUploadAdapter {
//     constructor(loader) {
//       this.loader = loader;
//     }

//     upload() {
//       return this.loader.file.then(
//         (file) =>
//           new Promise((resolve, reject) => {
//             const formData = new FormData();
//             formData.append('image', file);

//             axios
//               .post('http://192.168.29.229:3004/api/process/add-image', formData, {
//                 headers: {
//                   'Content-Type': 'multipart/form-data'
//                 }
//               })
//               .then((response) => {
//                 const imageUrl = response?.data?.url; // Assuming the response contains the image URL in `response.data.url`
//                 console.log('<img src="' + imageUrl + '"/>');
//                 resolve({
//                   default: imageUrl
//                 });
//               })
//               .catch((error) => {
//                 reject(error);
//               });
//           })
//       );
//     }

//     abort() {
//       // Handle abort
//     }
//   }

//   function MyCustomUploadAdapterPlugin(editor) {
//     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       return new MyUploadAdapter(loader);
//     };
//   }

//   const editorConfiguration = {
//     extraPlugins: [MyCustomUploadAdapterPlugin]

//   };

//   const submitForm = () => {
//     const payload = {
//       id,
//       stepDescription
//     };

//     console.log('Submitting form with payload:', payload);

//     axios
//       .patch('http://your-api-url/process', payload, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       .then((res) => {
//         console.log('Response from API:', res);
//       })
//       .catch((error) => {
//         console.error('Error while submitting form:', error);
//       });
//   };

//   return (
//     <div>
//       <Button onClick={submitForm}>Add</Button>
//       <CKEditor
//         editor={ClassicEditor}
//         config={editorConfiguration}
//         data={editorData}
//         onReady={(editor) => {
//           console.log('Editor is ready to use!', editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log('Editor data:', data);
//           setEditorData(data);
//           setStepDescription(data);
//         }}
//         onBlur={(event, editor) => {
//           console.log('Editor blurred.', editor);
//         }}
//         onFocus={(event, editor) => {
//           console.log('Editor focused.', editor);
//         }}
//       />
//     </div>
//   );
// };

// export default Ckeditor;
