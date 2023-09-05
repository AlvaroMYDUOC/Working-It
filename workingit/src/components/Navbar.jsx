//Importes necesarios
//useState es para el cambio de estado de los links al parecer
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components'
import BurgerButton from './BurgerButton'


function Navbar() {
    const[clicked, setClicked] = useState(false)
    console.log(clicked)
    const handleClick= () => {
        //Cuando esta true lo pasa a false y viceversa
        setClicked(!clicked)
    }
  return (
    <>
        <NavContainer>
            <h2>NavBar <span>Working It</span></h2>
            <div className={`links ${clicked ? 'active': ''}`}>
                <a className="nav-link dropdown-toggle" href="#" id='navbarDropdown' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categorias
                <div className='dropdown-menu' href='#'>
                    <a className='dropdown-item' href='#'>HOLA</a>
                </div>
                </a>
                <a onClick={handleClick} href="#h">Solicita una asesoria</a>
                <a onClick={handleClick} href="#h">Eres un especialista?</a>
                <a onClick={handleClick} href="#h">Crea tu cuenta</a>
                <a onClick={handleClick} href="#h">Ingresa</a>
            </div>
            <div className='burguer'>
            <BurgerButton clicked={clicked} handleClick={handleClick}/>
            </div>
            <BgDiv className={`initial ${clicked ? 'active': ''}`}></BgDiv>
        </NavContainer>
    </>
  )
}

export default Navbar

const NavContainer = styled.nav`
    h2{
        color: white;
        font-weight: 400;
        span{
            font-weight: bold;
        }
    }
    padding: .4rem;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
        color: white;
        text-decoration: none;
        margin-right: 1rem;
    }
    .burguer{
        @media(min-width: 768px){
            display: none;
        }
            
    }
    .links{
        position:  absolute;
        top: -700px;
        left: -2000px;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        transition: all .5s ease;
        a{
            color: white;
            font-size: 2rem;
            display: block;
        }
        @media(min-width: 768px){
            position: initial;
            margin: 0;
            a{
                font-size: 1rem;
                color: white;
                display: inline;
            }
        }
    
    }
    .links.active{
        width: 100%;
        display: block;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 30%;
        left: 0;
        right: 0;
        text-align: center;
        a{
            font-size: 2rem;
            margin-top: 1rem;
            color: white;
        }
    }
`

const BgDiv = styled.div`
    position: absolute;
    background-color: #222;
    top: -1000px;
    left: -1000px;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all .6s ease;

    &.active{
        border-radius: 0 0 80% 0;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

`