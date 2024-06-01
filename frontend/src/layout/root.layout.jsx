import { Outlet } from "react-router-dom";
import Navigation from "../components/shared/Navigation";
import Footer from "../components/shared/Footer";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function RootLayout() {
  return (
    <>
      <Navigation />
      <ToastContainer/>
      <Outlet />
      <Footer/>
    </>
    
  );
}

export default RootLayout;
