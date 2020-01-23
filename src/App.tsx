import React, { useEffect } from "react";
import userManager from './managers/userManager'
import {BrowserRouter} from "react-router-dom";

const App: React.FC = () => {

  useEffect(() => {
    userManager.welcome()
  });

  return (
      <BrowserRouter>
    <div>
      Welcome
    </div>
      </BrowserRouter>
  );
}

export default App;
