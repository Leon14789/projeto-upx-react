import React from 'react'
import { filterMyQuestions } from '../../store/actions/app.action'
import { Link } from 'react-router-dom'
import { FaPlus, FaEllipsisV, FaLink, FaPencilAlt } from 'react-icons/fa'
import { SCROLL  } from '../../config/App'
import { Button, CircularProgress, IconButton, Menu, MenuItem, Slide, Fade} from '@mui/material'


import Header from '../header'
import { useDispatch, useSelector } from 'react-redux'

export default function Main() {
   
  const dispatch = useDispatch()
   
  const myQuestions = useSelector(state => state.appReducer.questions)
   
  const [ isLoading, setLoading ] = React.useState(true)

  const [ isLoadMore, setLoadMore ] = React.useState(false)

  const [ query, setQuery ] =  React.useState({ page: 1 })

  const [ state, setState ] = React.useState({
    isDeleted: null,
    menuEl: null,
    confirmEl: null
})

React.useEffect(() => {
  document.addEventListener('scroll', _handleScroll );
  _index();
}, [])

const _handleScroll = (event) => {
  let scrollTop = event.srcElement.body.scrollHeight - (event.srcElement.body.offsetHeight + event.srcElement.body.scrollTop);
  if(scrollTop < SCROLL) {
      if(!isLoadMore && _handleLoadMore());
  }
}

const _handleLoadMore = () => {
  if(myQuestions.current_page < myQuestions.last_page) {
      setQuery({
          ...query,
          page: query.page + 1
      }, () => {
          _index(true);
      })
  }
}

const _handleMenu = (event) => {
    setState({ menuEl: event.currentTarget })
}


const _index = (loadMore) => {
    const userId = localStorage.getItem('user_id');
  
    dispatch(filterMyQuestions(userId, query, loadMore)).then(res => {
      if (res) {
        setLoading(false);
        if (isLoadMore && setLoadMore(false));
      }
    });
  };

return (
  <>
      <Header  />
      <div className="container mt-4 pt-3">
          {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"> <CircularProgress/> </div> :
              <>
                  <div className="d-flex mb-4 ml-3">
                      <Link to="/question" className="ml-auto">
                          <Button variant="contained" color="primary" size="large">
                              <FaPlus size="1.5em" className="mr-2" />
                             Nova Pergunta
                          </Button>
                      </Link>
                  </div>

                  <div className="d-flex card">
                  {(myQuestions.data.length >= 0) && 
                                <div className="card-header">
                                    <h1 className="m-0">Minhas Perguntas:  {myQuestions.total}</h1>
                                </div>
                            }
                           

                           <div className="p-2 p-md-3">
                                {myQuestions.data.map((item, index) => (
                                    <React.Fragment key={index}>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="d-flex justify-content-center align-items-center">
                                        {(state.isDeleted === item.id) ? 
                                            <CircularProgress color="primary" /> :
                                            <h3>{item.title}</h3>
                                          
                                        }
                                        </div>

                                        <div className='ml-auto '>
                                            <IconButton id={index} onClick={_handleMenu}> 
                                                <FaEllipsisV />
                                            </IconButton>

                                            {(Boolean(state.menuEl)) &&
                                                <Menu
                                                    anchorEl={state.menuEl}
                                                    getContentAnchorEl={null}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left'
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                    TransitionComponent={window.innerWidth < 577 ? Slide : Fade }
                                                    open={(index === parseInt(state.menuEl.id))}
                                                    onClose={() => setState({ menuEl: null})}
                                                    onClick={() => setState({ menuEl: null})}
                                                >
                                                    <MenuItem>
                                                            <Link to={'/myQuestion/'+item.id}> 
                                                                <FaLink size='1.2em' className="mr-4" /> Vizualizar
                                                            </Link>
                                                    </MenuItem>
                                                </Menu>
                                            } 
                                        </div>
                                    </div>
                                    {index < myQuestions.data.length - 1 && <hr />}
                                    </React.Fragment>
                                ))}
                            </div>


                  </div>
              </>
          }
      </div>
  </>
)
}




