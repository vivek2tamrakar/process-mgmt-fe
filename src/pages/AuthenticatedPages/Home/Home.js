import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProcessList } from "../../../features/Group/groupslice";
import {
  AddProcessLink,
  Header,
  HeaderMessage,
  HeaderTableHeader,
  HomeContainer,
  HomeContent,
  HomeHeader,
  TableData,
} from "../Group/Styled";
import { BookOutlined } from "@ant-design/icons";
import useGet from "../../../hooks/useGet";
import { Link } from "react-router-dom";

// Date formatting function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const Home = () => {
  const { mutateAsync: GroupListGet } = useGet();
  const { processList } = useSelector((state) => state.group);
  const [allProcess, setGetAllProcess] = useState(processList);
  const dispatch = useDispatch();

  const LoggedInName = localStorage.getItem("LoggedInName");

  const fetchData = () => {
    GroupListGet({
      url: "group/list",
      type: "details",
      token: true,
    })
      .then((res) => {
        dispatch(getProcessList({ processList: res?.process }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGetAllProcess(processList);
  }, [processList]);
  console.log(allProcess, "allProcess");
  return (
    <>
      <HomeContainer>
        <HomeHeader>
          <HeaderMessage>
            <span>Welcome, {LoggedInName}</span>
          </HeaderMessage>
          <HeaderTableHeader>
            <div>Date Created</div>
            <div>Last Update</div>
            <div>Last Review</div>
          </HeaderTableHeader>
        </HomeHeader>
        <HomeContent>
          <TableData>
            <table>
              {allProcess?.map((i) => (
                <tr>
                  <td className="Processname">
                    <div>
                      <BookOutlined />
                      <span>{i?.name}</span>
                    </div>
                  </td>
                  <td className="DateCreated">{formatDate(i?.createdAt)}</td>
                  <td className="LastUpdated">01-Aug-2023</td>
                  <td className="LastReview">01-Aug-2023</td>
                </tr>
              ))}
            </table>
          </TableData>
          <AddProcessLink>
            <span>
              Create a new process <Link to="/add-process">here</Link>
            </span>
          </AddProcessLink>
        </HomeContent>
      </HomeContainer>
    </>
  );
};

export default Home;
