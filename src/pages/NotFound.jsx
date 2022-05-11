import React from 'react';
import styled from 'styled-components';
import bkgd_img from '../img/four_oh_four_bkgd.png'

const FourOhFour = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bkgd_img});
  background-repeat: 'no-repeat';
  background-position: 'center center';
  background-attachment: 'fixed';
  background-size: 'cover';
  h2{
    font-size: 5rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const NotFound = () => {
  return (
    <FourOhFour>
      <h2>404: Page Not Found!</h2>
    </FourOhFour>
  )
};

export default NotFound;