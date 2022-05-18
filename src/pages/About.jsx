import React from "react";
import styled from "styled-components";
import about_bkgd from "../img/about_bkgd.png";

const AboutWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url(${about_bkgd});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  p {
    margin: 0 auto;
    min-width: 80%;
    font-size: 1.5rem;
    color: #ffffff;
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

const TextWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const About = () => {
  return (
    <AboutWrapper>
      <TextWrapper>
        <p>A brewery locator project created by Javi Guerra and Casey Reyes.</p>
        <p>
          With this location app, we want to help others find any and all local
          breweries with a simple search.
        </p>
      </TextWrapper>
    </AboutWrapper>
  );
};

export default About;