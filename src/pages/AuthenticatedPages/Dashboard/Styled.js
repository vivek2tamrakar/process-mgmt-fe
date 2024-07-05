import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 15px;
  display: flex;
  gap: 20px;
`;
export const Groups = styled.div`
  background-color: white;
  width: 140px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px -1px gray;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  button {
    background-color: #003e6b;
    color: white;
    border: none;
    border-radius: 6px;
  }
`;
export const GroupContainerDashboard = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  margin-left: 15px;
`;
export const ContainerDashboard = styled.div`
  height: calc(100vh - 59px);
  overflow: auto;
`;
export const GroupComtainer = styled.div`
  background-color: white;
  width: 220px;
  height: 120px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0px gray;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 11px;
  font-size: 20px;
  font-weight: 600;
  svg {
    width: 40px;
    height: 40px;
    fill: #ddd;
  }
  span {
    font-size: 16px;
  }
`;
export const Content = styled.div`
  margin-top: auto;
  text-align: center;
  padding: 9px 5px;
  color: #fff;
  background: #003e6b;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
export const FolderComtainer = styled.div`
  background-color: white;
  width: 220px;
  height: 120px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0px gray;
`;
export const ProcessComtainer = styled.div`
  background-color: white;
  width: 220px;
  height: 120px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0px gray;
`;
