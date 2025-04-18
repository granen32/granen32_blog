import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types
type ModalType = {
  id: string;
  component: ReactNode;
  props?: Record<string, any>;
};

interface ModalContextType {
  modals: ModalType[];
  openModal: (id: string, component: ReactNode, props?: Record<string, any>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

// Create context with default value
const ModalContext = createContext<ModalContextType>({
  modals: [],
  openModal: () => {},
  closeModal: () => {},
  closeAllModals: () => {},
});

// Props type for the provider
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalType[]>([]);

  // Open a modal
  const openModal = useCallback((id: string, component: ReactNode, props?: Record<string, any>) => {
    setModals(prevModals => {
      // If modal with this ID already exists, replace it
      const exists = prevModals.some(modal => modal.id === id);
      if (exists) {
        return prevModals.map(modal => (modal.id === id ? { id, component, props } : modal));
      }
      // Otherwise add a new modal
      return [...prevModals, { id, component, props }];
    });
  }, []);

  // Close a specific modal by ID
  const closeModal = useCallback((id: string) => {
    setModals(prevModals => prevModals.filter(modal => modal.id !== id));
  }, []);

  // Close all modals
  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals }}>
      {children}
      {/* Render all active modals */}
      {modals.map(modal => (
        <React.Fragment key={modal.id}>
          {React.isValidElement(modal.component)
            ? React.cloneElement(modal.component as React.ReactElement, {
                onClose: () => closeModal(modal.id),
                ...modal.props,
              })
            : modal.component}
        </React.Fragment>
      ))}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
