import React from 'react'
import { changeNotify } from '../../store/actions/notify.action';
import { Snackbar, SnackbarContent } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles';
import { green, red } from '@mui/material/colors';
import { redirect } from 'react-router-dom';

const useStyles = makeStyles({
    success: {
        backgroundColor: green[500], 
    },
    error: {
        background: red[600],
    }
});

export default function Notify() {
    const dispatch = useDispatch();
    const notify = useSelector(state => state.notifyReducer);
    const classes = useStyles();

   
  return (
    <Snackbar
        anchorOrigin={{
            horizontal: notify.horizontal,
            vertical: notify.vertical
        }}
        open={notify.open}
        autoHideDuration={notify.time}
        onClose={() => dispatch( changeNotify({open: false}))}
    >


        <SnackbarContent
            className={classes[notify.class]}
            message={
                <span className='d-flex align-items-center '>{notify.msg}</span>
            }
        > 

        </SnackbarContent>

    </Snackbar>
  )
}