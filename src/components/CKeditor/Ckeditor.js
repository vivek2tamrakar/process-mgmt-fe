import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Button } from 'antd';
const { REACT_APP_DETAILS_URL } = process.env;

const Ckeditor = ({ id }) => {
  const [stepDescription, setStepDescription] = useState('');
  const [editorData, setEditorData] = useState('');
  const token = localStorage.getItem('token');
  console.log(token, 'token');
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
              .post(`${REACT_APP_DETAILS_URL}process/add-image`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then((response) => {
                const imageUrl = response?.data?.result?.url;
                console.log('URL', response?.data?.result?.url);
                console.log('response', response);
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
      .patch(`${REACT_APP_DETAILS_URL}process`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
