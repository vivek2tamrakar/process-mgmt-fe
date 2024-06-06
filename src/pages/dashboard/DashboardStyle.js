import styled from 'styled-components';

export const Container = styled.div``;

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
export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const GroupContainer = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
`;
