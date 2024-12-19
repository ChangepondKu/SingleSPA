import React from 'react'
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fallbackPersistor, fallbackStore } from './redux/store';


const Root = (props) => {
  const persistor = props.persistor || fallbackPersistor;
  const store = props.store || fallbackStore
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}></PersistGate>
      <BrowserRouter>
          <Navbar />
      </BrowserRouter>
    </Provider>
  )
}

export default Root;

