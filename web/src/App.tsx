import React from 'react';

import AppProvider from './context';

import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Signin />
      </AppProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
