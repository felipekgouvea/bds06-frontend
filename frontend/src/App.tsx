import React from 'react';
import './App.css';
import '../src/assets/styles/custom.scss';
import Routes from './Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from '../src/AuthContext';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
