import React from 'react'
import { index } from '../../store/actions/app.action'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { SCROLL, rootUrl } from '../../config/App'
import { Button, CircularProgress } from '@mui/material'


import Header from '../header'
import { useDispatch, useSelector } from 'react-redux'

export default function Main() {
   
  const dispatch = useDispatch()
   
  const questions = useSelector(state => state.appReducer.questions)
   
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
  if(questions.current_page < questions.last_page) {
      setQuery({
          ...query,
          page: query.page + 1
      }, () => {
          _index(true);
      })
  }
}


const _index = (loadMore) => {
  dispatch(index(query, loadMore)).then(res => {
      if(res){
          setLoading(false)
          if(isLoadMore && setLoadMore(false));
      }
  })
}

return (
  <>
      <Header title="Veiculos" />
      <div className="container mt-4 pt-3">
          {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"> <CircularProgress/> </div> :
              <>
                  <div className="d-flex mb-4">
                      <h3 className="font-weight-normal">Listagem de Perguntas</h3>
                      <Link to="/question" className="ml-auto">
                          <Button variant="contained" color="primary" size="large">
                              <FaPlus size="1.5em" className="mr-2" />
                              Perguntar
                          </Button>
                      </Link>
                  </div>

                  <div className="card">
                      {(questions.data.length > 0) && 
                          <div className="card-header">
                              <h6 className="m-0">Veiculos {questions.total}</h6>
                          </div>
                      }

                      <div className="p-2 p-md-3">
                          {questions.data.map((item, index) => (
                              <React.Fragment key={index}>
                                  <div className="d-md-flex">
                                      <div className="d-flex">
                                          <div className="d-flex justify-content-center align-items-center">
                                              {(state.isDeleted === item.id) ? 
                                                  <CircularProgress color="primary" /> :
                                                  (item.cover && <img alt="" className="shadow rounded" src={rootUrl + 'thumb/vehicles/'+item.cover.img+'?u='+item.cover.user_id+'&s='+item.cover.vehicle_id+'&w=180&h=135'} />)
                                              }
                                          </div>
                                          <div className="vehicle-detail pl-3 pl-md-4">
                                              <h6>{item.vehicle_brand.label} {item.vehicle_model.label}</h6>
                                              <strong className="d-block">{item.vehicle_version.label}</strong>
                                              {(item.vehicle_price) && 
                                                  <strong className="text-danger h5 d-block">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.vehicle_price)}</strong>
                                              }
                                          </div>
                                      </div>
                                  </div>
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




