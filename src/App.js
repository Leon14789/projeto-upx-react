import React from 'react';
import './global.css'
import { Provider } from 'react-redux'; 
import { store } from './store/store';
import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css' 
import ReactRoutes from './routes'
import { Loading, Notify, Alert  } from './view/components';





const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    }
  },
    


  components: {


    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%', 
          '& .MuiInputBase-input': {
            color: '#000',
          }
          
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiSelect-root': {
              color: '#000'
          }
        }
      }
    }


  },
});



const App = () => {
  return (
    <Provider store={store}>


    
    <ThemeProvider theme={theme}>
     

  
    
<Notify></Notify>
      
    <Alert></Alert>
      <Loading></Loading>

        <ReactRoutes></ReactRoutes>
      
    </ThemeProvider>
    </Provider>
  )
}

export default App;