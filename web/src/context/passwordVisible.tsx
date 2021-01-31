import React, { createContext, useCallback, useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface PasswordVisibleContextData {
  type?: string;
  icon: Object;
  handlePasswordVisible: () => void;
}

export const PasswordVisibleContext = createContext<PasswordVisibleContextData>(
  {} as PasswordVisibleContextData,
);

export const PasswordVisibleProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('password');

  const icon = visible ? (
    <AiOutlineEye size={22} />
  ) : (
    <AiOutlineEyeInvisible size={22} />
  );

  const handlePasswordVisible = useCallback(() => {
    setVisible(!visible);
    if (visible) {
      setType('password');
    } else {
      setType('text');
    }
  }, [visible]);

  return (
    <PasswordVisibleContext.Provider
      value={{ handlePasswordVisible, icon, type }}
    >
      {children}
    </PasswordVisibleContext.Provider>
  );
};

export function usePasswordVisible(): PasswordVisibleContextData {
  const context = useContext(PasswordVisibleContext);

  const verifyContext = Object.keys(context).length;

  if (!verifyContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
