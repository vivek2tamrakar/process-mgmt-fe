import React from "react";
import { Content } from "../../layout/HomeLayout/Style";
import BannerImage from "../../assets/images/404.png";
const Homepage = () => {
  return (
    <>
      <Content style={{textAlign:'center'}}>
        <img src={BannerImage} alt="noimage" style={{width:'auto'}}/>
      </Content>
    </>
  );
};

export default Homepage;
