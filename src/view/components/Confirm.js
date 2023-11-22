import React from 'react'
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'


export default function Confirm(props) {
    const { open, title, onClose, onConfirm } = props;
  return (
    <Dialog
        open={open}
        onClose={() => onClose()}
    >
        <DialogTitle disableTypagraphy> 
            <h6> {title || 'Tem certeza da ação a seguir?'} </h6>
        </DialogTitle>

        <DialogActions className='justify-content-center mb-2'>
            <Button onClick={() => onClose()}>
                Não
            </Button>
            <Button onClick={() => { 
                onClose();
                onConfirm(); }}
                variant='contained' 
                color='primary'
             >
                Sim
            </Button>
        </DialogActions>

    </Dialog>
  )
}
