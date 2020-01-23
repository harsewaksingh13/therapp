import React, { useEffect } from "react";
import userManager from './managers/userManager'
import { BrowserRouter } from "react-router-dom";
import Routes, { AppRouteBinder } from './routes/routes'
import Login from "./pages/login";

const allRoutes: [AppRouteBinder] = [{
  path: "/login",
  component: Login
}]

const App: React.FC = () => {

  useEffect(() => {
    userManager.welcome()
  });

  return (
    <BrowserRouter>
      <Routes {...allRoutes}>
         <div>
            Welcome
         </div>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
