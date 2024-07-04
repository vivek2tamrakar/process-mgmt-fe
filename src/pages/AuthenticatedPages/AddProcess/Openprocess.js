import React, { useState, useEffect } from 'react';
import {
  StepContainer,
  AddProcessContainer,
  BoxInput,
  CkEditorComtainer,
  AllInputsContainer,
  StepsContainer,
  ProcessActionsContainer
} from './styled';
import { Breadcrumb, Button, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Ckeditor from '../../../components/CKeditor/Ckeditor';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddStep } from '../../../features/step/stepSlice';

const { TextArea } = Input;
const Openprocess = () => {
  const dispatch = useDispatch();
  const process = useSelector((state) => state.process.selectedProcess);
  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const { id, name, description, tags, steps } = process || {};

  const [clickedIndex, setClickedIndex] = useState(null);
  const [stepDescriptions, setStepDescriptions] = useState(process?.step?.map((i) => stripHtmlTags(i?.stepDescription).split('\n')[0]));
  const [checkList, setCheckList] = useState(false);

  const handleAddStepClick = () => {
    dispatch(toggleAddStep());
  };

  const handleUpdateStepClick = (index) => {
    setClickedIndex(index);
    dispatch(toggleAddStep());
  };

  const handleEditorChange = (data, index) => {
    const updatedDescriptions = [...stepDescriptions];
    updatedDescriptions[index] = stripHtmlTags(data).split('\n')[0];
    setStepDescriptions(updatedDescriptions);
    setClickedIndex(null);
  };

  useEffect(() => {
    if (clickedIndex !== null) {
      setStepDescriptions((prevDescriptions) => {
        const updatedDescriptions = [...prevDescriptions];
        updatedDescriptions[clickedIndex] = stripHtmlTags(process?.step[clickedIndex]?.stepDescription).split('\n')[0];
        return updatedDescriptions;
      });
    }
  }, [clickedIndex, process]);
  const sortedSteps = process?.step?.slice().sort((a, b) => a.id - b.id);
  console.log('sortedSteps', sortedSteps, process.step);
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
            <Input value={name} type="text" placeholder="Enter Process Name" readOnly />
          </BoxInput>
          <BoxInput>
            <label>Description:</label>
            <TextArea value={description} type="text" rows={2} placeholder="Enter Process Description" readOnly />
          </BoxInput>
          <BoxInput>
            <label>Tags:</label>
            <TextArea value={tags} type="text" rows={2} placeholder="Tags and Keywords" readOnly />
          </BoxInput>
          <BoxInput>
            <label>Steps</label>
            {sortedSteps
              ?.slice()
              ?.sort((a, b) => a.id - b.id)
              ?.map((i, index) => (
                <StepContainer key={index}>
                  <div>
                    {' '}
                    <Input
                      value={`${index + 1}. ${stepDescriptions[index]}`}
                      type="text"
                      placeholder={`Add Step ${index + 1}`}
                      onClick={() => handleUpdateStepClick(index)}
                      readOnly
                    />
                  </div>
                  {checkList && (
                    <div>
                      <Input type="checkbox" />
                    </div>
                  )}
                </StepContainer>
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
          <Button>Edit Process</Button>
          <Button onClick={() => setCheckList(true)}>Run CheckList</Button>
          <Button>More Options</Button>
        </ProcessActionsContainer>
      </StepsContainer>
      {clickedIndex !== null ? (
        <CkEditorComtainer className="CkEditorComtainer">
          <Ckeditor
            data={process?.step[clickedIndex]?.stepDescription}
            onChange={(event) => handleEditorChange(event.editor.getData(), clickedIndex)}
          />
        </CkEditorComtainer>
      ) : (
        <CkEditorComtainer className="CkEditorComtainer">
          <Ckeditor id={id} />
        </CkEditorComtainer>
      )}
    </AddProcessContainer>
  );
};

export default Openprocess;
