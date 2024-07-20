import React, { useState, useEffect } from 'react';
import {
    AddProcessContainer,
    BoxInput,
    AllInputsContainer,
    StepsContainer,
} from './styled';
import { Breadcrumb, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Styles from "./Style.module.css"
const { TextArea } = Input;

const Viewprocess = () => {
    const process = useSelector((state) => state.process.selectedProcess);
    const stripHtmlTags = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    const { name, description, tags } = process || {};
    const [clickedIndex, setClickedIndex] = useState(null);
    const [stepDescriptions, setStepDescriptions] = useState(process?.step?.map((i) => stripHtmlTags(i?.stepDescription).split('\n')[0]));
    
    const sortedSteps = process?.step?.slice().sort((a, b) => a.id - b.id);


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
