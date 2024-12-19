import React from 'react'
import HomePage from './components/HomePage'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = (props) => {
  const { store } = props;
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  )
}

export default Root

