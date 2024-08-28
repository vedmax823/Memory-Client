

import { Outlet } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import SecureLS from "secure-ls";
// import { router } from "../routes/route";


const PrivateRoutes = () => {
    const ls = new SecureLS();
    const token = ls.get('userToken');  
    console.log(token);
    
  
    return token
      ? <Outlet />
      : <LoginPage />
  }

export default PrivateRoutes;