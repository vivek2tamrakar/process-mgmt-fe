import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setStepDescription } from '../../features/CKeditor/ckeditorslice';

const { REACT_APP_DETAILS_URL } = process.env;

const Ckeditor = () => {
  const dispatch = useDispatch();
  const [editorData, setEditorData] = useState('');

  const isAddStepEnabled = useSelector((state) => state.features.isAddStepEnabled);
  const stepDescription = useSelector((state) => state.stepDescription.stepDescription);
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

  return (
    <div>
      {/* <Button onClick={submitForm}>Add</Button> */}
      <CKEditor
        disabled={isAddStepEnabled}
        editor={ClassicEditor}
        config={editorConfiguration}
        data={editorData}
        onReady={(editor) => {
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          dispatch(setStepDescription(data));
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
      />
    </div>
  );
};

export default Ckeditor;
