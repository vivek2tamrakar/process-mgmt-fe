import styled from "styled-components";

export const LoginLayoutContainer = styled.div`
  display: flex;
`;
export const LeftSideBar = styled.div`
  width: 17%;
  height: 100vh;
  background-color: #000000;
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
  height: 55px;
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
  margin-top: 20px;
  a {
    color: white;
    text-decoration: none;
  }
`;
export const SidebarRoute = styled.div`
  height: 40px;
  background-color: ${({ isselected }) =>
    isselected ? "#003e6b" : "transparent"};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0px 0 0 30px;
  font-size: 18px;
  font-weight: ${({ isselected }) => (isselected ? "600" : "400")};
  gap: 10px;
  margin-top: 5px;
`;
export const SidebarGroupRoute = styled.div`
  height: 40px;
  background-color: ${({ isselected }) =>
    isselected ? "#003e6b" : "transparent"};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0px 0 0 60px;
  font-size: 18px;
  font-weight: ${({ isselected }) => (isselected ? "600" : "400")};
  gap: 10px;
  margin-top: 5px;
`;
export const SidebarFolderRoute = styled.div`
  height: 40px;
  background-color: ${({ isselected }) =>
    isselected ? "#003e6b" : "transparent"};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0px 0 0 90px;
  font-size: 18px;
  font-weight: ${({ isselected }) => (isselected ? "600" : "400")};
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
    font-size: 21px;
    font-weight: 600;
    color: black;
  }
`;
export const ProfileContainer = styled.div``;
// export const LoginLayoutContainer = styled.div``;
// export const LoginLayoutContainer = styled.div``;
// export const LoginLayoutContainer = styled.div``;
// export const LoginLayoutContainer = styled.div``;
// export const LoginLayoutContainer = styled.div``;
