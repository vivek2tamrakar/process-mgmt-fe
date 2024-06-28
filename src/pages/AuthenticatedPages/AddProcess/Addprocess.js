import React from 'react';
import { AddProcessContainer, BoxInput, CkEditorComtainer, AllInputsContainer, StepsContainer } from './styled';
import { Breadcrumb, Button, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Ckeditor from '../../../components/CKeditor/Ckeditor';
import { useLocation } from 'react-router-dom';
const { TextArea } = Input;
const Addprocess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const name = queryParams.get('name');

  return (
    <>
      <AddProcessContainer>
        <StepsContainer>
          <Breadcrumb>
            Home
            <RightOutlined />
            {name}
          </Breadcrumb>
          <AllInputsContainer className="okokokok">
            <BoxInput>
              <label>Name:</label>
              <Input type="text" placeholder="Enter Process Name" />
            </BoxInput>
            <BoxInput>
              <label>Description:</label>
              <TextArea type="text" rows={2} placeholder="Enter Process Description" />
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
          <Ckeditor id={id} />
        </CkEditorComtainer>
      </AddProcessContainer>
    </>
  );
};

export default Addprocess;
