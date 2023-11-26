import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, } from '@mui/material'
import {  FaUsers, FaWhatsapp, FaSignOutAlt, FaHome, } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
export default function Header(props) {
  
  const [state, setState] = React.useState({
    open: false
  })


  const userNome = localStorage.getItem('user_name');

    return (
    
    <>
   
     {(window.innerWidth < 577) ?
       <AppBar position="fixed">
       <Toolbar variant="dense">
         <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setState({open: true})}>
           <MdMenu />
         </IconButton>
         <Typography variant="h6" >
           {props.title}
         </Typography>
       </Toolbar>
     </AppBar>
        
        :

        <nav className="header navbar navbar-expand-lg navbar-light bg-white">
            <div className='container'>
                    <Link
                        className='navbar-brand'
                        to="/question"
                    >
                        {(userNome) ? userNome : "Nome do usuario nao Definido" }
                    </Link>
            

                <ul className='navbar-nav'> 
                <li className='nav-item'>
                        <Link className='nav-link' to="/main">
                        <FaHome className='icon-lg mr-2' /> Inicio
                        </Link>
                    </li>
                  <li className='nav-item'>
                        <Link className='nav-link' to="/question">
                        <FaUsers className='icon-lg mr-2' /> Perguntar
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/myQuestion">
                        <FaUsers className='icon-lg mr-2' /> Minhas Perguntas
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/">
                           <FaSignOutAlt className='icon-lg mr-2' /> Sair
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    
    }

    
    </>
  )
}
