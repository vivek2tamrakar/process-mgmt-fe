import React, { useState, useEffect } from 'react';
import {
    StepContainer,
    AddProcessContainer,
    BoxInput,
    AllInputsContainer,
    StepsContainer,
} from './styled';
import { Breadcrumb, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddStep } from '../../../features/step/stepSlice';
import Styles from "./Style.module.css"
const { TextArea } = Input;

const Viewprocess = () => {
    const dispatch = useDispatch();
    const process = useSelector((state) => state.process.selectedProcess);
    const stripHtmlTags = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    const { id, name, description, tags } = process || {};
    const [clickedIndex, setClickedIndex] = useState(null);
    const [stepDescriptions, setStepDescriptions] = useState(process?.step?.map((i) => stripHtmlTags(i?.stepDescription).split('\n')[0]));
    const [reviewedStep, setReviewedStep] = useState([]);

    const sortedSteps = process?.step?.slice().sort((a, b) => a.id - b.id);


    const handleUpdateStepClick = (id) => {
        const index = process?.step?.findIndex(val => val.id === id)
        setClickedIndex(index);
        dispatch(toggleAddStep());
        if (!reviewedStep.includes(id)) {
            setReviewedStep(prev => [...prev, id])
        }
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

    return (
        <AddProcessContainer>
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
                </AllInputsContainer>
            </StepsContainer>
            <div className={Styles.steps}>
                <label><strong>Steps :</strong></label>
                <br/>
                <br/>
                {sortedSteps?.map((i, index) => (
                    <div key={index}>
                        <div>
                            <Input
                                value={`${index + 1}. ${stripHtmlTags(i?.stepDescription)?.split(/\r?\n|\r|\s\s+/)[0]
                                    .trim()}`}
                                type="text"
                                placeholder={`Add Step ${index + 1}`}
                                style={{ backgroundColor: '#ccc' }}
                                readOnly
                            />
                        </div>
                        <div className={Styles.stepDiscription} dangerouslySetInnerHTML={{ __html:  i?.stepDescription}}></div>
                    </div>
                ))}
            </div>
        </AddProcessContainer>
    );
};

export default Viewprocess;
