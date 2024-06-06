import React from 'react';
import { AddTaskContainer, Arrowdiv, Arrow, ArrowBox } from '../../../src/layout/MainLayout/Drawer/Styled';
import PlusSvg from '../../assets/svg/PlusSvg';

const AddTaskOptions = ({ setOption, option, handleOpen }) => {
  return (
    <>
      <AddTaskContainer onClick={() => setOption(!option)}>
        <div>
          <PlusSvg />
        </div>
        <div>
          <p>ADD NEW TASK</p>
        </div>
      </AddTaskContainer>
      <ArrowBox show={option}>
        <Arrow></Arrow>
        <Arrowdiv>
          <button onClick={handleOpen}>New Group</button>
          <button>New Folder</button>
          <button>New Process</button>
        </Arrowdiv>
      </ArrowBox>
    </>
  );
};

export default AddTaskOptions;
