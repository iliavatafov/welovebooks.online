import { useCallback, useState } from "react";
import { createContext } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const showModal = useCallback(() => {
    setIsModal(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const addModalMessage = useCallback((message) => {
    setModalMessage(message);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        isModal,
        modalMessage,
        showLoading,
        hideLoading,
        showModal,
        hideModal,
        addModalMessage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
