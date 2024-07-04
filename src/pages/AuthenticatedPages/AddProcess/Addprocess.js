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
import { updateProcessName, updateProcessDescription, updateProcessTags, updateStepId } from '../../../features/process/processSlice';

const { TextArea } = Input;
const Addprocess = () => {
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
    const clickedStepId = process?.step[index]?.id;
    console.log('Clicked Step ID:', clickedStepId);
    setClickedIndex(index);
    dispatch(toggleAddStep());
    dispatch(updateStepId(clickedStepId));
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
  const sortedSteps = process?.step?.slice()?.sort((a, b) => a.id - b.id);
  const handleNameChange = (e) => {
    dispatch(updateProcessName(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(updateProcessDescription(e.target.value));
  };

  const handleTagsChange = (e) => {
    dispatch(updateProcessTags(e.target.value));
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
            <Input value={process.name} onChange={handleNameChange} type="text" placeholder="Enter Process Name" />
          </BoxInput>
          <BoxInput>
            <label>Description:</label>
            <TextArea
              value={process.description}
              onChange={handleDescriptionChange}
              type="text"
              rows={2}
              placeholder="Enter Process Description"
            />
          </BoxInput>
          <BoxInput>
            <label>Tags:</label>
            <TextArea value={process.tags} onChange={handleTagsChange} type="text" rows={2} placeholder="Tags and Keywords" />
          </BoxInput>
          <BoxInput>
            <label>Steps</label>
            {process?.step?.map((i, index) => (
              <StepContainer key={index}>
                <div>
                  <Input
                    // value={`${index + 1}. ${stripHtmlTags(i?.stepDescription).split('\n')[0]}`}
                    // value={`${index + 1}. ${stripHtmlTags(i?.stepDescription).split('\n')[0].split(' ')[0]}`}
                    value={`${index + 1}. ${stripHtmlTags(i?.stepDescription).split(/\s+/)[0]}`}
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
          {/* <Button disabled>Edit Process</Button> */}
          <Button disabled onClick={() => setCheckList(true)}>
            Run CheckList
          </Button>
          <Button disabled>More Options</Button>
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

export default Addprocess;
