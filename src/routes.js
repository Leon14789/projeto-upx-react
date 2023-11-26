import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Register = lazy(() => import('./view/register'))
const Auth = lazy(() => import('./view/auth'))
const Main = lazy(() => import('./view/main'))
const Question = lazy(() => import('./view/questions'))
const QuestionEdit = lazy(() => import('./view/main/response'))
const MyQuestions = lazy(() => import('./view/questions/myQuestions'))

const reactRoutes = () => {
    return(
        
        <Router>
            <Suspense fallback={<div className="d-flex justify-content-center mt-5 pt-5">
                <CircularProgress></CircularProgress>
            </div>}>
                <Routes>
                        <Route exact path="/" Component={Auth}></Route>

                        <Route path="/register" Component={Register}></Route>

                        <Route path="/main" Component={Main}></Route>

                        <Route path="/question" Component={Question}></Route>
                        
                        <Route path="/question/:id" Component={QuestionEdit}></Route>

                        <Route path="/myQuestion/" Component={MyQuestions}></Route>

                </Routes>
            </Suspense>
        </Router>


    )}

    export default reactRoutes;