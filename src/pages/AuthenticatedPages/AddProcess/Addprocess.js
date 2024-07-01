import React, { useState } from 'react';
import { AddProcessContainer, BoxInput, CkEditorComtainer, AllInputsContainer, StepsContainer, ProcessActionsContainer } from './styled';
import { Breadcrumb, Button, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Ckeditor from '../../../components/CKeditor/Ckeditor';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddStep } from '../../../features/step/stepSlice';

const { TextArea } = Input;

const Addprocess = () => {
  const dispatch = useDispatch();
  const process = useSelector((state) => state.process.selectedProcess);

  const { id, name, description, tags, steps } = process || {};

  const handleAddStepClick = () => {
    dispatch(toggleAddStep());
  };

  return (
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
            <Input value={name} type="text" placeholder="Enter Process Name" />
          </BoxInput>
          <BoxInput>
            <label>Description:</label>
            <TextArea value={description} type="text" rows={2} placeholder="Enter Process Description" />
          </BoxInput>
          <BoxInput>
            <label>Tags:</label>
            <TextArea value={tags} type="text" rows={2} placeholder="Tags and Keywords" />
          </BoxInput>
          <BoxInput>
            <label>Steps</label>
            {process?.step?.map((i, index) => (
              <>
                <Input value={index + 1 + '. ' + i?.stepDescription} type="text" placeholder="Add Step 1" />
              </>
            ))}
          </BoxInput>
          <Button
            style={{
              backgroundColor: 'rgb(0, 62, 107)',
              color: '#ffffff',
              marginLeft: '20px'
            }}
            onClick={handleAddStepClick}
          >
            + Add Step
          </Button>
        </AllInputsContainer>
        <ProcessActionsContainer>
          <Button disabled>Edit Process</Button>
          <Button disabled>Run CheckList</Button>
          <Button disabled>More Options</Button>
        </ProcessActionsContainer>
      </StepsContainer>
      <CkEditorComtainer className="CkEditorComtainer">
        <Ckeditor id={id} />
      </CkEditorComtainer>
    </AddProcessContainer>
  );
};

export default Addprocess;
