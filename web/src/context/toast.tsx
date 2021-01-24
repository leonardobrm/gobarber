import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'info' | 'sucess' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        description,
        type,
        title,
      };

      setMessage([...message, toast]);
    },
    [message],
  );

  const removeToast = useCallback(
    (id: string) => {
      const filterToast = message.filter(msg => msg.id !== id);
      setMessage(filterToast);
    },
    [message],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={message} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  const verifyContext = Object.keys(context).length;

  if (!verifyContext) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
