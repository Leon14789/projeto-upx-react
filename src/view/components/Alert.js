import React from 'react'
import { changeAlert } from '../../store/actions/alert.action'
import { Modal, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { MdCheckCircle, MdDangerous } from 'react-icons/md'


export default function Alert() {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alertReducer )

    if (alert.open) {
        setTimeout(() => dispatch( changeAlert({open: false})), alert.time )
    }

  return (
    <Modal
        open={alert.open}
        onClose={ () => dispatch( changeAlert({open: false}) ) }
        className="d-flex justify-content-center align-items-center h-100"
    >

        <div className='bg-white rounded-lg d-flex align-items-center outiline-none p-4'>
            {(alert.class === 'success')    &&  
                <MdCheckCircle style={{fontSize: '2.5rem'}} className='mr-3 text-success' >
                </MdCheckCircle>

            }
             {(alert.class === 'error')    &&  
                <MdDangerous style={{fontSize: '2.5rem'}} className='mr-3 text-danger' >
                </MdDangerous>

            }
            <Typography className='font-weight-bold p-2' variant='subtitle2'> 
                {alert.msg} 
            </Typography>
        </div>

    </Modal>
  )
}
