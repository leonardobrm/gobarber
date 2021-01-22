import React from 'react';

import { AuthProvider } from './context/AuthContext';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Signin />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
