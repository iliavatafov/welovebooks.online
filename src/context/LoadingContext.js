import { useState } from "react";
import { createContext } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const showModal = () => {
    setIsModal(true);
  };

  const hideModal = () => {
    setIsModal(false);
  };

  const addModalMessage = (message) => {
    setModalMessage(message);
  };

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
