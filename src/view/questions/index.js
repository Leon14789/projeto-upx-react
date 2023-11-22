import React from 'react'
import {  TextField, Button } from '@mui/material'
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector  } from 'react-redux'
import { change, question } from '../../store/actions/question.action';
import {  useNavigate } from 'react-router-dom';
import Header from '../header/'

export default function Question() {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const { userQuestion, success, error } = useSelector(state => state.questionReducer)
  return (
    
    <div className=' min-vh-100'>
        <Header />
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-5'>
             <div className='form-group text-center'>
             <img src="/logo.png" alt='Lucas colocar Logo' height="100"/>
                <Typography  className='mt-3' variant='h6' component="h1">
                    Faça sua pergunta
                </Typography>          
             </div>

            


             <TextField 
             error={(error.title) && true}
                type='text'
                margin='normal'
                label='Titulo da Questão'
                value={userQuestion.title}
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
                value={userQuestion.description}
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
                 onClick={ () => dispatch(question(userQuestion)) }
            >

                Criar Pergunta

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
