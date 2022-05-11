import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #cd9f42;
    padding: 1rem 1.5rem;
    width: 100vw;
    overflow-x: hidden;
    & > a{
        text-decoration: none;
    }
    h1{
        font-family: 'Oleo Script', cursive;
        &:hover{
            color: #ffe5cb;
        }
    }
`

const NavWrapper = styled.nav`
    display: flex;
    ul{
        display: flex;
        list-style-type: none;
    }
    li{
        padding-lefrt: 1.5rem;
        &: first-child{
            padding-left: 0;
        }
    }
    a{
        text-decoration: none;
        &:hover{
            color: #ffe5cb;
        }
        &.active{
            color: #94e6ed;
        }
    }
`

const Header = () => {
    return (
        <HeaderWrapper>
            <Link to='/'>
                <h1>Brew Maps</h1>
            </Link>
            <NavWrapper>
                <ul>
                    <li>
                        <NavLink to='/about'>About</NavLink>
                    </li>
                </ul>
            </NavWrapper>
        </HeaderWrapper>
    )
}

export default Header;