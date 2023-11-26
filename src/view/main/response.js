import React, { useEffect, useState } from 'react';
import { show } from '../../store/actions/app.action';
import { index } from '../../store/actions/response.actions';
import { CircularProgress, IconButton, Menu, MenuItem, Slide, Fade } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { FaUsers, FaEllipsisV, FaPencilAlt } from 'react-icons/fa';
import Header from '../header';
import { useDispatch, useSelector } from 'react-redux';

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((prevValue) => prevValue + 1);
}

export default function Main() {
  const dispatch = useDispatch();
  const questionId = useSelector((state) => state.appReducer.questionId);
  const responses = useSelector((state) => state.appReducer.responses);
  const [isLoading, setLoading] = React.useState(true);
  const [isLoadMore, setLoadMore] = React.useState(false);
  const [state] = React.useState({ isDeleted: null });
  const { id } = useParams();
  const forceUpdate = useForceUpdate();

  React.useEffect(() => {
    _show();
    dispatchIndex(id);
  }, [dispatch, id]);

  const dispatchIndex = (questionId) => {
    dispatch(index(parseInt(questionId, 10)))
      .then(() => dispatch(show(id)))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      });
  };

  const _show = (loadMore) => {
    dispatch(show(id, loadMore))
      .then(() => {
        forceUpdate(); 
        if (isLoadMore) setLoadMore(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div className="container mt-4 pt-3">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="d-flex mb-4 ml-3">
              <Link
                className="btn bg-white large"
                to="/createResponse"
                onClick={() => localStorage.setItem('question_id', id)}
              >
                <FaUsers className="icon-lg mr-2" /> Responder
              </Link>
            </div>

            <div className="d-flex card mb-4">
              <div className="p-2 p-md-3">
                <h1>PERGUNTA</h1>
              </div>
            </div>

            <div className="d-flex card">
              <div className="p-2 p-md-3">
                <div className="">
                  <div className="">
                    {questionId.id ? (
                      <h3>Titulo: {questionId.title ? questionId.title : 'Sem um Título'}</h3>
                    ) : (
                      <CircularProgress color="primary" />
                    )}
                    <hr />
                  </div>
                  <div className="">
                    {state.isDeleted === questionId.id ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <h3> Dúvida: {questionId.description}</h3>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex card mt-4">
              <div className="p-2 p-md-3">
                <h1>RESPOSTAS</h1>
              </div>
            </div>

            {responses && responses.data && responses.data.length > 0 ? (
              responses.data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="d-md-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center">
                      {state.isDeleted === item.id ? (
                        <CircularProgress color="primary" />
                      ) : (
                        <h3>{item.title}</h3>
                      )}
                    </div>
                    <div className="ml-auto "></div>
                  </div>
                  {index < responses.data.length - 1 && <hr />}
                </React.Fragment>
              ))
            ) : (
              <div>Nenhuma resposta encontrada.</div>
            )}
          </>
        )}
      </div>
    </>
  );
}
