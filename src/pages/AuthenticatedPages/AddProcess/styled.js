import styled from 'styled-components';

export const AddProcessContainer = styled.div`
  border: 1px solid black;
  height: calc(100vh - 57px);
  display: flex;
`;
export const ProcessStepButton = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  top: 15px;
  right: 100px;
`;

export const StepsContainer = styled.div`
  width: 35%;
  border-right: 1px solid black;
  .ant-breadcrumb.css-dev-only-do-not-override-zg0ahe {
    color: black;
    font-size: 16px;
    font-weight: 600;
    padding: 20px;
  }
  .okokokok::-webkit-scrollbar {
    width: 5px;
  }

  .okokokok::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 5px;
  }

  .okokokok::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 5px;
  }
`;
export const CkEditorComtainer = styled.div`
  width: 65%;
  .ck-blurred.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
    height: 543px;
  }
`;

export const BoxInput = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0 10px 20px;
  width: 60%;
  gap: 4px;
  label {
    color: black;
    font-size: 14px;
  }
`;
export const AllInputsContainer = styled.div`
  height: 400px;
  overflow: auto;
`;
export const ProcessActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0px 0px 10px 20px;
  width: 60%;
  gap: 3px;
`;
export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

export const LineThrough = styled.div`
top: 15px;
background-color: #000;
position: absolute;
height: 1px;
z-index: 999;
width: 180px;
`;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
// export const AddProcessContainer = styled.div``;
