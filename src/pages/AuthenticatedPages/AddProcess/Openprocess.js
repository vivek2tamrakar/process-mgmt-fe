import React, { useState, useEffect, useRef } from 'react';
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
import { Breadcrumb, Button, Input, Drawer } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Ckeditor from '../../../components/CKeditor/Ckeditor';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddStep } from '../../../features/step/stepSlice';
import { useNavigate } from 'react-router-dom';
import usePatch from 'hooks/usePatch';
import Comments from "./Comments";
import { toast } from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';
import Styles from "./Style.module.css"
import CommonModal from '../../../components/CommonModal/CommonModal';
const { TextArea } = Input;

const Openprocess = () => {
  const { mutateAsync: CommonPatch } = usePatch();
  const dispatch = useDispatch();
  const process = useSelector((state) => state.process.selectedProcess);
  const contentToPrint = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const handlePrint = useReactToPrint({
    documentTitle: "Process Detail",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
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
  const [open, setOpen] = useState(false);
  const [reviewedStep, setReviewedStep] = useState([]);

  const sortedSteps = process?.step?.slice().sort((a, b) => a.id - b.id);

  const handleAddStepClick = () => {
    dispatch(toggleAddStep());
  };

  const handleUpdateStepClick = (id) => {
    const index = process?.step?.findIndex(val => val.id === id)
    setClickedIndex(index);
    dispatch(toggleAddStep());
    if (!reviewedStep.includes(id)) {
      setReviewedStep(prev => [...prev, id])
    }
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

  function showModal(title) {
    setModalTitle(title);
    setIsModalOpen(true);
  }


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

  const reviewProcess = () => {
    setMoreOpt((val) => !val)
    toast.success('Review Process Completed!');
  }

  const copy = async (id, type) => {
    try {
      await navigator.clipboard.writeText(id+"_"+type);
      toast.success('Process Copied.');
    }
    catch(err) {
      console.log(err)
    }
  }

  const saveSteps = () => {
    if (!stepPayload) {
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
    <>
      <div ref={contentToPrint} style={{ display: "none" }} className="print-process">
        <h1>{name}</h1>
        <label style={{ fontSize: 24, marginBottom: 10, textDecoration: 'underline', display: 'inline-block', fontWeight: 'bold' }}>Description:</label>
        <div style={{ fontSize: 26, marginBottom: 15 }}>{description}</div>
        <label style={{ fontSize: 24, marginBottom: 10, textDecoration: 'underline', display: 'inline-block', fontWeight: 'bold' }}>Tags:</label>
        <div style={{ fontSize: 26, marginBottom: 15 }}>{tags}</div>
        <label style={{ fontSize: 24, marginBottom: 10, textDecoration: 'underline', display: 'inline-block', fontWeight: 'bold' }}>Steps</label>
        {sortedSteps?.map((i, index) => (
          <div style={{ fontSize: 26, marginBottom: 9 }}>{`${index + 1}. ${stripHtmlTags(i?.stepDescription).split('\n')[0]} `} </div>
        ))}
      </div>
      <AddProcessContainer>
        {checkList && <ProcessStepButton>
          <Button onClick={() => saveSteps()}>Step Completed</Button>
          <Button onClick={() => setCheckList(false)}>Cancel</Button>
        </ProcessStepButton>}
        <StepsContainer>
          <Breadcrumb>
            Home
            <RightOutlined />
            {name}
          </Breadcrumb>
          <AllInputsContainer className="okokokok printable-element">
            <BoxInput>
              <label>Name:</label>
              <Input value={name} type="text" placeholder="Enter Process Name" style={{ backgroundColor: '#ccc' }} readOnly />
            </BoxInput>
            <BoxInput>
              <label>Description:</label>
              <TextArea value={description} type="text" rows={2} placeholder="Enter Process Description" style={{ backgroundColor: '#ccc' }} readOnly />
            </BoxInput>
            <BoxInput>
              <label>Tags:</label>
              <TextArea value={tags} type="text" rows={2} placeholder="Tags and Keywords" style={{ backgroundColor: '#ccc' }} readOnly />
            </BoxInput>
            <BoxInput>
              <label>Steps</label>
              {sortedSteps?.map((i, index) => (

                <StepContainer key={index}>
                  <div>
                    {i.isCompleted && <LineThrough></LineThrough>}
                    {' '}
                    <Input
                      value={`${index + 1}. ${stripHtmlTags(i?.stepDescription)?.split(/\r?\n|\r|\s\s+/)[0]
                        .trim()}`}
                      type="text"
                      placeholder={`Add Step ${index + 1}`}
                      onClick={() => handleUpdateStepClick(i.id)}
                      style={{ backgroundColor: '#ccc' }}
                      readOnly
                    />
                  </div>
                  {checkList && (
                    <div>
                      <Input type="checkbox" style={{ height: 15, width: 15 }} onChange={() => handleCheckboxChange(i.id)} checked={stepIds.includes(i.id)} />
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
            <Button onClick={() => saveSteps()} disabled={stepIds.length != sortedSteps.length}>
              Review Complete
            </Button>
            {
              (parseInt(userRole) === 4 || parseInt(userRole) === 3 || parseInt(userRole) === 2) && (
                <Button onClick={handleEditProcessClick}>Edit Process</Button>
              )}

            <Button onClick={() => setCheckList(true)}>Run CheckList</Button>

            <div style={{ position: 'relative', width: '100%' }}>
              <Button style={{ width: '100%' }} onClick={() => {setMoreOpt((val) => !val)}}>More Options</Button>
              {moreOpt && <MoreOptionList style={{ position: 'absolute' }}>
                <MoreOptionListItem className={`${reviewedStep.length !== sortedSteps.length ? Styles.disable : ''}`}
                  onClick={reviewProcess}>Review Process</MoreOptionListItem>
                <MoreOptionListItem onClick={() => {
                  handlePrint(null, () => contentToPrint.current);
                  setMoreOpt((val) => !val);
                }}>Print</MoreOptionListItem>
                <MoreOptionListItem onClick={() => copy(id, 'MOVE')}>Move Process</MoreOptionListItem>
                <MoreOptionListItem onClick={() => copy(id, 'COPY')}>Copy Process</MoreOptionListItem>
                <MoreOptionListItem>Delete Process</MoreOptionListItem>
                <MoreOptionListItem>View Mark Up Mode/Edits/Comments</MoreOptionListItem>
                <MoreOptionListItem>View Process details</MoreOptionListItem>
                <MoreOptionListItem onClick={() => showModal('ShareProcess')}>Share Process</MoreOptionListItem>
                <MoreOptionListItem>Send Process</MoreOptionListItem>
                <MoreOptionListItem onClick={() => {setOpen(true); setMoreOpt((val) => !val)}}>Comment on Process</MoreOptionListItem>
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
      <Drawer title="Comments" onClose={() => setOpen(false)} open={open}>
        <Comments id={id}></Comments>
      </Drawer>
      <CommonModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={modalTitle}
        fetchData={()=> {}}
      />
    </>
  );
};

export default Openprocess;
