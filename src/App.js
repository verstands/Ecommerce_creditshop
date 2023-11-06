import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import RoutePage from './Routes/routes';

function App() {
  return (
    <>
      <RoutePage />
      <ToastContainer />
    </>
  );
}

export default App;
