import React from "react";
import { Content } from "../../layout/HomeLayout/Style";
import BannerImage from "../../assets/images/homepage.jpg";

const Homepage = () => {
  return (
    <>
      <Content>
        <img src={BannerImage} alt="noimage" />
      </Content>
    </>
  );
};

export default Homepage;
