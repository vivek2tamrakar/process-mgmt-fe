import styled from 'styled-components';

//////////////////////////////////////////////////////Home Style Component/////////////////////////////////
export const HomeContainer = styled.div`
  height: calc(100vh - 59px);
  overflow: auto;
`;
export const HomeHeader = styled.div`
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 150px 0 30px;
  span {
    font-size: 16px;
    font-weight: 600;
    a {
      text-decoration: none;
      color: black;
    }
  }
`;
export const HeaderMessage = styled.div``;
export const HeaderTableHeader = styled.div`
  display: flex;
  gap: 40px;
  align-items: end;
  height: 100%;

  div {
    font-size: 16px;
    margin-bottom: 4px;
    margin-right: 20px;
  }
`;

export const HomeContent = styled.div`
  height: 87.7%;
  border-top: 1px solid black;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  table {
    width: 100%;
    margin-top: 10px;
    tr {
      .Processname {
        position: relative;
        left: 22px;
        font-size: 16px;
        cursor: pointer;
      }
      .DateCreated {
        width: 135px;
        position: relative;
        left: -31px;
        font-size: 14px;
      }
      .LastUpdated {
        width: 125px;
        position: relative;
        left: -21px;
        font-size: 14px;
      }
      .LastReview {
        width: 250px;
        font-size: 14px;
      }
    }
    td {
      padding: 4px;
    }
  }
`;
export const TableData = styled.div`
  height: 330px;
  overflow: auto;
`;
export const AddProcessLink = styled.div`
  padding: 0px 0px 0px 25px;
  span {
    a {
      cursor: pointer;
      color: rgb(0, 62, 107);
      font-weight: 600;
    }
  }
`;
