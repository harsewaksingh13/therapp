import React, { useEffect } from "react";
import userInteractor from './interactors/userInteractor'

const App: React.FC = () => {

  useEffect(() => {
    userInteractor.welcome()    
  });

  return (
    <div>
      Welcome
    </div>
  );
}

export default App;
