import React from 'react';
import { AddProcessContainer, BoxInput, CkEditorComtainer, AllInputsContainer, StepsContainer } from './styled';
import { Breadcrumb, Button, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Ckeditor from '../../../components/CKeditor/Ckeditor';
const { TextArea } = Input;
const Addprocess = () => {
  return (
    <>
      <AddProcessContainer>
        <StepsContainer>
          <Breadcrumb>
            Home <RightOutlined /> Group Name <RightOutlined /> Folder Name
            <RightOutlined />
            Process Name
          </Breadcrumb>
          <AllInputsContainer className="okokokok">
            <BoxInput>
              <label>Name:</label>
              <Input type="text" placeholder="Enter Process Name" />
            </BoxInput>
            <BoxInput>
              <label>Description:</label>
              <TextArea
                type="text"
                rows={2}
                placeholder="Enter Process Description"
                //   maxLength={6}
              />
            </BoxInput>
            <BoxInput>
              <label>Tags:</label>
              <TextArea
                type="text"
                rows={2}
                placeholder="Tags and Keywords"
                //   maxLength={6}
              />
            </BoxInput>
            <BoxInput>
              <label>Steps:</label>
              <Input type="text" placeholder="Add Step 1" />
            </BoxInput>
            <Button
              style={{
                backgroundColor: 'rgb(0, 62, 107)',
                color: '#ffffff',
                marginLeft: '20px'
              }}
            >
              + Add Step
            </Button>
          </AllInputsContainer>
        </StepsContainer>
        <CkEditorComtainer className="CkEditorComtainer">
          <Ckeditor />
        </CkEditorComtainer>
      </AddProcessContainer>
    </>
  );
};

export default Addprocess;
