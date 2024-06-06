// import styled from 'styled-components';

// export const Container = styled.div`
//   height: 100vh;
//   width: 324px;
//   background-color: #000000;
//   display: flex;
//   // align-items: center;
//   justify-content: center;
// `;

// export const AddTaskContainer = styled.div`
//   cursor: pointer;
//   height: 120px;
//   width: 130px;
//   background-color: #003e6b;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   position: fixed;
//   bottom: 80px;
//   border-radius: 20px;
//   box-shadow: 0px 4px 14px 1px #003e6b;
//   p {
//     color: white;
//   }
//   div {
//     width: 140px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
// `;

// export const ArrowBox = styled.div`
//   box-shadow: 0px 4px 14px 1px gray;
//   height: 110px;
//   width: 130px;
//   position: relative;
//   top: 450px;
//   left: 145px;
//   border-radius: 4px;
//   opacity: ${({ show }) => (show ? 1 : 0)};
//   visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
//   transition:
//     opacity 0.5s ease,
//     visibility 0.5s ease;
// `;

// export const Arrow = styled.div`
//   height: 20px;
//   background-color: white;
//   width: 20px;
//   position: absolute;
//   top: 10px;
//   transform: rotate(43deg);
//   left: -8px;
// `;

// export const Arrowdiv = styled.div`
//   background-color: white;
//   height: 100%;
//   width: 100%;
//   z-index: 9999;
//   position: relative;
//   border-radius: 4px;
//   padding: 10px;
//   button {
//     width: 110px;
//     height: 26px;
//     margin-top: 4px;
//   }
// `;

import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 324px;
  background-color: #000000;
  // display: flex;
  // justify-content: center;
`;

export const AddTaskContainer = styled.div`
  cursor: pointer;
  height: 120px;
  width: 130px;
  background-color: #003e6b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  bottom: 80px;
  border-radius: 20px;
  box-shadow: 0px 4px 14px 1px #003e6b;
  p {
    color: white;
  }
  div {
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ArrowBox = styled.div`
  box-shadow: 0px 4px 14px 1px gray;
  height: 110px;
  width: 130px;
  position: relative;
  // top: -60px;
  left: 145px;
  border-radius: 4px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
`;

export const Arrow = styled.div`
  height: 20px;
  background-color: white;
  width: 20px;
  position: absolute;
  top: 10px;
  transform: rotate(43deg);
  left: -8px;
`;

export const Arrowdiv = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  z-index: 9999;
  position: relative;
  border-radius: 4px;
  padding: 10px;
  button {
    width: 110px;
    height: 26px;
    margin-top: 4px;
  }
`;
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  p {
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
`;
export const RoutesContainer = styled.div`
  height: calc(100vh - 250px);
  width: 100%;
  a {
    text-decoration: none;
  }
`;
export const SelectedRoute = styled.div`
  background-color: #003e6b;
  color: white;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 16px;
    font-weight: 600;
  }
`;
export const Route = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? '#003e6b' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'gray')};
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  p {
    font-size: 16px;
    font-weight: 600;
  }
`;
export const AddTaskBox = styled.div`
  margin-left: 70px;
`;
