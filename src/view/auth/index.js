import React from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch, useSelector  } from 'react-redux'
import { change, login } from '../../store/actions/auth.action'
import { useNavigate, Link } from 'react-router-dom'
import { withStyles } from '@mui/styles'



export default function Auth() {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { credentials, success } = useSelector(state => state.authReducer)


  return (
    <div className='d-flex bg-white min-vh-100'>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-3'>
             <div className='form-group text-center'>
                <Typography  className='mt-3' variant='h6' component="h1">
                   Projeto de UPX 2
                </Typography>
             </div>
             <TextField 
                label="Email"
                type='email'
                margin='normal'
                autoComplete='email'
                value={credentials.email}
                onChange={text => dispatch(change({email: text.target.value }) ) }
             /> 
              <TextField 
                label="Senha"
                type='password'
                margin='normal'
                autoComplete='password'
                value={credentials.password}
                onChange={text => dispatch(change({password: text.target.value }) ) }
             /> 

             <Button
                variant='contained'
                color='primary'
                fullWidth
                size='large'
                className='mt-4'
                onClick={() => dispatch( login(credentials) )}
             >Acessar</Button>

            <Button
                component={Link}
                to="/register"
                variant='contained'
                color='success'
                fullWidth
                size='large'
                className='mt-4'
               
             >Cadastrar</Button>
             
           
          {(success) &&
          navigate('/main')
          }


             

            

          </div>
        </div>
      </div>
    </div>
  )
}
