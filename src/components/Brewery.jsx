import React from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { phoneStyle } from '../services/Functions';
import styled, {css} from 'styled-components';

const CardWrapper = styled.div`
  border: 1px black solid;
  border-radius: .5em;
  cursor: pointer;
  background-color: #cd9f42;
  .card{
    &:hover{
      p{
        background-color: #85cdd2;
      }
    }
  }
  .brewType{
    text-transform: capitalize;
  }
  ${props => props.isSelected && css`
  background-color: #85cdd2`}
`

const Brewery = ({brewery: {id, name, street, city, state, phone, brewery_type}, isSelected}) => {
  const navigate = useNavigate();
  return (
    <CardWrapper isSelected={isSelected}>
      <div key={nanoid()} className="card" onClick={()=> navigate(`/brewery_locator/brewery/${id}`)}>
        <p>{name}</p>
        <p>{street} {city}, {state}</p>
        <p>{phoneStyle(phone)}</p>
        <p className='brewType'>{brewery_type}</p>
      </div>
    </CardWrapper>
  )
};

export default Brewery;