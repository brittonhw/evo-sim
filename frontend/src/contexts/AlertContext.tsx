import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StickerType } from '../components/header/HeaderSticker';

interface Alert {
  message: string;
  type: StickerType;
}

interface AlertContextType {
  alert: Alert | null;
  showAlert: (message: string, type?: StickerType, seconds?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (message: string, type = StickerType.Info, seconds = 3) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, seconds * 1000); // Hide the alert after 3000 ms
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};