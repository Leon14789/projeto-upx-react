import React from 'react'
import { show } from '../../store/actions/app.action'; 
import { Button, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'; 

import Header from '../header'
import { useDispatch, useSelector } from 'react-redux'

export default function Main() {
   
  const dispatch = useDispatch()
   
  const questionId = useSelector(state => state.appReducer.questionId)
   
  const [ isLoading, setLoading ] = React.useState(true)

  const [ isLoadMore, setLoadMore ] = React.useState(false)



  const [ state  ] = React.useState({isDeleted: null})

  const { id } = useParams();

React.useEffect(() => {
  _show();
}, [])



const _show = (loadMore) => {
    dispatch(show(id)).then((res) => {
      if (res) {
        setLoading(false);
        if (isLoadMore && setLoadMore(false));
      }
    });
  };

  return (
    <>
      <Header />
      <div className="container mt-4 pt-3">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            {' '}
            <CircularProgress />{' '}
          </div>
        ) : (
          <>

            <div className="d-flex card">
              <div className="p-2 p-md-3">
              <div className="">
                <div className="">
                    {questionId.id ? (
                    <h3>Titulo: {(questionId.title) ? questionId.title : "Sem um TItulo" }</h3>
                    
                    ) : (
                        <CircularProgress color="primary" />
                    )}
                    <hr />
                </div>
                <div className="">
                    {state.isDeleted === questionId.id ? (
                    <CircularProgress color="primary" />
                    ) : (
                    <h3> Duvida: {questionId.description}</h3>
                    )}
                </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
