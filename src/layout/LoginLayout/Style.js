import styled from 'styled-components';

export const LoginLayoutContainer = styled.div`
  display: flex;
`;
export const LeftSideBar = styled.div`
  width: 17%;
  height: 100vh;
  background-color: #000000;
  /* overflow-y: auto !important;
  overflow: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: green;
  } */
`;
export const SideBarHeader = styled.div`
  background-color: white;
  /* height: 55px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 23px;
  img {
    width: 120px;
    height: 55px;
    /* object-fit: cover; */
  }
  p {
    font-size: 18px;
    font-weight: 600;
  }
`;
export const RightContent = styled.div`
  width: 83%;
  background-color: #f5f5f5;
`;
export const Header = styled.div`
  background-color: white;
  height: 59px;
  width: calc(100vw - 290px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 30px;
`;

export const SideBarOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-btn.css-dev-only-do-not-override-zg0ahe.ant-btn-primary {
    width: 110px;
    font-size: 16px;
    font-weight: 600;
  }
`;
export const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const SidebarRoutesContainer = styled.div`
  max-height: calc(100vh - 134px);
  overflow-y: auto !important;
  overflow: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
  }
  margin-top: 20px;
  a {
    color: white;
    text-decoration: none;
  }
`;
export const SidebarRoute = styled.div`
  height: 40px;
  background-color: ${({ isselected }) => (isselected ? '#003e6b' : 'transparent')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0px 0 0 30px;
  font-size: 18px;
  font-weight: ${({ isselected }) => (isselected ? '600' : '400')};
  gap: 10px;
  margin-top: 5px;
`;
export const SidebarGroupRoute = styled.div`
  height: 40px;
  background-color: ${({ isselected }) => (isselected ? '#003e6b' : 'transparent')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0px 0 0 60px;
  font-size: 18px;
  font-weight: ${({ isselected }) => (isselected ? '600' : '400')};
  gap: 10px;
  margin-top: 5px;
`;
export const SidebarFolderRoute = styled.div`
  height: 40px;
  background-color: ${({ isselected }) => (isselected ? '#003e6b' : 'transparent')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0px 0 0 90px;
  font-size: 18px;
  font-weight: ${({ isselected }) => (isselected ? '600' : '400')};
  gap: 10px;
  margin-top: 5px;
`;
export const HomeRoutes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  a {
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: black;
  }
`;
export const ProfileContainer = styled.div`
  div {
    background-color: whitesmoke;
    height: 45px;
    width: 55px;
    display: flex;
    align-items: c;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      height: 35px;
      width: 40px;
      border-radius: 36px;
    }
  }
`;
export const ProcessStepButton = styled.div`
  display: flex;
  gap: 20px;
`;
export const ProfileContainerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  button {
    width: 95px;
  }
`;
export const SearchBar = styled.input`
padding: 5px 12px 5px 40px;
height: 40px;
background-color: #fff;
border: 1px solid #d9d9d9;
border-radius: 8px;
width: 240px;
`;
// export const LoginLayoutContainer = styled.div``;
// export const LoginLayoutContainer = styled.div``;
