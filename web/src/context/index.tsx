import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { PasswordVisibleProvider } from './passwordVisible';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <PasswordVisibleProvider>{children}</PasswordVisibleProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
