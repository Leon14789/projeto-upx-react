import React from 'react'
import { typographyClasses, Modal, CircularProgress } from '@mui/material'
import { changeLoading } from '../../store/actions/loading.action'
import { useSelector, useDispatch } from 'react-redux'


export default function Loading() {
    // dispatch é usado para disparar uma acao 
    const dispatch = useDispatch();
    // Desta forma podemos pegar o estado inicial do loadingReducer
    const loading = useSelector(state => state.loadingReducer)
  return (
    // usando open={loading.open} estou pegando o valor inicial do loading | ele espera receber V|F
    <Modal
        open={loading.open}
        onClose={() => dispatch( changeLoading({open: false}))}
        className='d-flex justify-content-center align-items-center h-100'

    >
        <div className='bg-white d-flex align-items-center roudend-lg p-3 outiline-nome'> 
          <CircularProgress size={50} ></CircularProgress>
          <typographyClasses variant="subtitle1" className="p-2">{loading.msg}</typographyClasses>
        </div>

    </Modal>
  )
}
