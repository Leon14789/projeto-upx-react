import React from 'react'
import {  TextField, Button } from '@mui/material'
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector  } from 'react-redux'
import { change, response } from '../../store/actions/response.actions'
import {  useNavigate } from 'react-router-dom';
import Header from '../header/'


export default function Response() {

 

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const { userResponse, success, error } = useSelector(state => state.responseReducer)



    const storedQuestionId = localStorage.getItem('currentQuestionId');

  return (
    
    <div className=' min-vh-100'>
        <Header />
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-5'>
             <div className='form-group text-center'>
                <Typography  className='mt-3' variant='h6' component="h1">
                    RESPOSTA
                </Typography>          
             </div>

            


             <TextField 
             error={(error.title) && true}
                type='text'
                margin='normal'
                label='Titulo da Resposta'
                value={userResponse.title}
                onChange={ text => {
                dispatch( change( { title: text.target.value }));
                    if(error.title && delete error.title);
                }}
            
            />

           

            {(error && error.title) && 
                <strong className='text-danger'> {error.title[0]} </strong>
            }

            <TextField 
                error={(error.description) && true}
                margin='normal'
                label='Descrição'
                type='description'
                value={userResponse.description}
                onChange={ text => {
                dispatch( change( { description: text.target.value }));
                    if(error.description && delete error.description);
                }}
            
            />

            {(error && error.description) && 
                <strong className='text-danger'> {error.description[0]} </strong>
            }


            <Button
                 variant='contained'
                 color='primary'
                 fullWidth
                 size='large'
                 className='mt-4'
                 onClick={ () => dispatch(response(userResponse)) }
            >

                Responder

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
