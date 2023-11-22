import React from 'react'
import {  TextField, Button } from '@mui/material'
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector  } from 'react-redux'
import { change, register } from '../../store/actions/register.action';
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const { user, success, error } = useSelector(state => state.registerReducer)
    console.log(error);
   
  return (
    
    <div className='d-flex bg-white min-vh-100'>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-3'>
             <div className='form-group text-center'>
             <img src="/logo.png" alt='Lucas colocar Logo' height="100"/>
                <Typography  className='mt-3' variant='h6' component="h1">
                    Crie sua conta 
                </Typography>          
             </div>

            <TextField 
                error={(error.name) && true}
                margin='normal'
                label='Nome'
                value={user.name}
                onChange={ text => {
                dispatch( change( { name: text.target.value }));
                    if(error.name && delete error.name);
                }}
            
            />
            

            {(error && error.name) && 
                <strong className='text-danger'> {error.name[0]} </strong>
            }

            <TextField 
                error={(error.email) && true}
                margin='normal'
                label='Email'
                type='email'
                autoComplete='email'
                value={user.email}
                onChange={ text => {
                dispatch( change( { email: text.target.value }));
                    if(error.email && delete error.email);
                }}
            
            />

            {(error && error.email) && 
                <strong className='text-danger'> {error.email[0]} </strong>
            }

            <TextField 
                error={(error.password) && true}
                margin='normal'
                label='Senha'
                type='password'
                value={user.password}
                onChange={ text => {
                dispatch( change( { password: text.target.value }));
                    if(error.password && delete error.password);
                }}
            
            />

            {(error && error.password) && 
                <strong className='text-danger'> {error.password[0]} </strong>
            }

            <Button
                 variant='contained'
                 color='primary'
                 fullWidth
                 size='large'
                 className='mt-4'
                 onClick={ () => dispatch(register(user)) }
            >

                Criar Cadastro

            </Button>



            {(success) &&
          navigate('/main')
          }

          </div>
        </div>
      </div>
    </div>
  )
}
