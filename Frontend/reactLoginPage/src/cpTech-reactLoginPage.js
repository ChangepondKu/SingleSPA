import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
// import { Provider } from 'react-redux';
// import store from 'rootconfig/store';
// import {setUserDetails} from 'rootConfig/userSlice'

// const store = React.lazy(() => import('./rootconfig/src/redux/store'));

// const App = () => {
//   return (
//     // <Suspense fallback={<div>Loading...</div>}>
//       <Provider store={store}>
//         <Root />
//       </Provider>
//     // </Suspense>
//   )
// }

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
