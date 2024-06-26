import React from "react";
import { Content } from "../../layout/HomeLayout/Style";
import BannerImage from "../../assets/images/best-team-landing-page-template-business-company-website-interface-idea-with-flat-illustrations-coworking-courses-homepage-layout-hr-management-web-banner-webp.jpg";

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
