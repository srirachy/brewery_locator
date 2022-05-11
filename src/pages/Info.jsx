import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getBrewery } from '../services/API';
import { phoneStyle } from '../services/Functions';
import styled from 'styled-components';
import info from '../img/info.png'

const InfoWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background-image: url(${info});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
`

const TextWrapper = styled.section`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1{
    font-size: 2rem;
    text-align: center;
  }
  p{
    font-size: 1.5rem;
    text-align: left;
    text-transform: capitalize;
  }
  #phone {
    text-decoration: underline;
  }
  #phone:hover {
    color: blue;
  }
`

const Info = () => {
  const [brewery, setBrewery] = useState([]);
  const { id } = useParams();
  const {name, street, city, state, phone, website_url, brewery_type} = brewery;
  
  useEffect(()=> {
    getBrewery(id)
    .then(({data:brewery}) => setBrewery(brewery))
    .catch((err)=> console.log(err));
  }, [getBrewery, id]);

  return (
    <InfoWrapper>
      <TextWrapper>
      <h1>Brewery Info</h1>
      <p>
        Name: {name}
        <br/>
        Address: {street} {city}, {state}
        <br/>
        Phone: {phone ? <span id="phone">{phoneStyle(phone)}</span> : 'N/A'}
        <br/>
        Website: {website_url ? <a href={website_url} target="_blank" rel="noreferrer">{website_url}</a> : 'N/A'}
        <br/>
        Type of Brewery: {brewery_type}
      </p>
      </TextWrapper>
    </InfoWrapper>
  );
};

export default Info;