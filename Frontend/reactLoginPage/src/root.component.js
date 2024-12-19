import React from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/logincss.css'
import { Provider } from 'react-redux';
import Profile from './pages/Profile';
import fallbackStore, { fallbackPersistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react';


const Root = (props) => {
  const  store  = props.store || fallbackStore;
  const persistor = props.persistor || fallbackPersistor
  return (

    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}></PersistGate>
      <Router basename="/auth">
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
      <Router>
        <Routes>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default Root
