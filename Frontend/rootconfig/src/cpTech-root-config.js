import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import './styles/layout.css'
import store, { persistor } from '../src/redux/store';

const modalApp = () => import("./utility/unavailable-modal");
localStorage.setItem('isStandAloneMode', false);
const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name).catch(async (error) => {
      console.error(`Error loading application: ${name}`, error);

      // Dynamically load and display the modal
      const unavailableModal = await modalApp();
      return {
        bootstrap: unavailableModal.bootstrap,
        mount:  (props) => unavailableModal.mount({ ...props, appName: name }),
        unmount: unavailableModal.unmount,
      };
    });
  },
  // Add the Redux store to `customProps`
  customProps: { store },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach((app) => {
  registerApplication({
    ...app,
    customProps: { store, persistor }
  })
});
layoutEngine.activate();
start();
