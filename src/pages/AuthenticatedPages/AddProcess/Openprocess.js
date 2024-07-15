import React, { useState, useEffect } from 'react';
import {
  StepContainer,
  AddProcessContainer,
  BoxInput,
  CkEditorComtainer,
  AllInputsContainer,
  StepsContainer,
  ProcessActionsContainer,
  ProcessStepButton,
  LineThrough,
  MoreOptionListItem,
  MoreOptionList
} from './styled';
import { Breadcrumb, Button, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Ckeditor from '../../../components/CKeditor/Ckeditor';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddStep } from '../../../features/step/stepSlice';
import { useNavigate } from 'react-router-dom';
import usePatch from 'hooks/usePatch';
import { toast } from 'react-hot-toast';

const { TextArea } = Input;

const Openprocess = () => {
  const { mutateAsync: CommonPatch } = usePatch();
  const dispatch = useDispatch();
  const process = useSelector((state) => state.process.selectedProcess);

  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const { id, name, description, tags, steps } = process || {};
  const navigate = useNavigate();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [stepDescriptions, setStepDescriptions] = useState(process?.step?.map((i) => stripHtmlTags(i?.stepDescription).split('\n')[0]));
  const [checkList, setCheckList] = useState(false);
  const [stepIds, setStepIds] = useState(() => process?.step?.filter((i) => i.isCompleted).map(i => i.id));
  const [stepPayload, setStepPayload] = useState(null);
  const [moreOpt, setMoreOpt] = useState(false);
  const userRole = localStorage.getItem('userRole');
  const handleAddStepClick = () => {
    dispatch(toggleAddStep());
  };
  console.log(process?.step)
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

  const handleCheckboxChange = (stepId) => {
    setStepIds((prevStepIds) => {
      const updatedStepIds = prevStepIds.includes(stepId) ? prevStepIds.filter((id) => id !== stepId) : [...prevStepIds, stepId];
      const updatedStepStatus = updatedStepIds.map((id) => true);

      const payload = {
        id: updatedStepIds,
        isCompleted: updatedStepStatus
      };

      setStepPayload(payload)
    
      return updatedStepIds;
    });
  };

  const saveSteps = () => {
      if(!stepPayload) {
        return;
      }
      CommonPatch({
        url: 'step',
        type: 'details',
        payload: stepPayload,
        token: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(res);
          toast.success('Step Marked Completed!');
          setCheckList(false)
        })
        .catch((err) => {
          console.error(err);
        });
  }

  const handleEditProcessClick = () => {
    navigate('/add-process');
  };
  return (
    <AddProcessContainer>
      { checkList && <ProcessStepButton>
        <Button onClick={() => saveSteps()}>Step Completed</Button>
        <Button onClick={() => setCheckList(false)}>Cancel</Button>
      </ProcessStepButton>}
      <StepsContainer>
        <Breadcrumb>
          Home
          <RightOutlined />
          {name}
        </Breadcrumb>
        <AllInputsContainer className="okokokok">
          <BoxInput>
            <label>Name:</label>
            <Input value={name} type="text" placeholder="Enter Process Name" style={{backgroundColor:'#ccc'}} readOnly />
          </BoxInput>
          <BoxInput>
            <label>Description:</label>
            <TextArea value={description} type="text" rows={2} placeholder="Enter Process Description" style={{backgroundColor:'#ccc'}} readOnly />
          </BoxInput>
          <BoxInput>
            <label>Tags:</label>
            <TextArea value={tags} type="text" rows={2} placeholder="Tags and Keywords" style={{backgroundColor:'#ccc'}} readOnly />
          </BoxInput>
          <BoxInput>
            <label>Steps</label>
            {sortedSteps
              ?.slice()
              ?.sort((a, b) => a.id - b.id)
              ?.map((i, index) => (
                <StepContainer key={index}>

                  <div>
                    {i.isCompleted && <LineThrough></LineThrough>}
                    {' '}
                    <Input
                      value={`${index + 1}. ${stepDescriptions[index]}`}
                      type="text"
                      placeholder={`Add Step ${index + 1}`}
                      onClick={() => handleUpdateStepClick(index)}
                      style={{backgroundColor:'#ccc'}}
                      readOnly
                    />
                  </div>
                  {checkList && (
                    <div>
                      <Input type="checkbox" onChange={() => handleCheckboxChange(i.id)} checked={stepIds.includes(i.id)} />
                    </div>
                  )}
                </StepContainer>
              ))}
          </BoxInput>
          {
          (parseInt(userRole) === 4 || parseInt(userRole) === 3 || parseInt(userRole) === 2) && (
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
          )}
        </AllInputsContainer>
        <ProcessActionsContainer>
        {
          (parseInt(userRole) === 4 || parseInt(userRole) === 3 || parseInt(userRole) === 2) && (<Button onClick={handleEditProcessClick}>Edit Process</Button>
          )}
          <Button onClick={() => setCheckList(true)}>Run CheckList</Button>
          <div style={{position: 'relative', width: '100%'}} onClick={() => setMoreOpt((val)=> !val)}>
            <Button style={{width: '100%'}}>More Options</Button>
            {moreOpt && <MoreOptionList style={{position: 'absolute'}}>
              <MoreOptionListItem>Review Process</MoreOptionListItem>
              <MoreOptionListItem>Print</MoreOptionListItem>
              <MoreOptionListItem>Move Process</MoreOptionListItem>
              <MoreOptionListItem>Copy Process</MoreOptionListItem>
              <MoreOptionListItem>Delete Process</MoreOptionListItem>
              <MoreOptionListItem>View Mark Up Mode/Edits/Comments</MoreOptionListItem>
              <MoreOptionListItem>View Process details</MoreOptionListItem>
              <MoreOptionListItem>Share Process</MoreOptionListItem>
              <MoreOptionListItem>Send Process</MoreOptionListItem>
              <MoreOptionListItem>Comment on Process</MoreOptionListItem>
            </MoreOptionList>}
          </div>
          
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
