import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingContext } from "../../context/LoadingContext";

import "../Modal/Modal.css";

export const Modal = ({ message }) => {
  const navigate = useNavigate();

  const { hideModal } = useContext(LoadingContext);

  const closeModal = () => {
    hideModal();
    navigate("/");
  };

  return (
    <div className="error-page" onClick={closeModal}>
      <div className="error-message-container">
        <div className="error-message">{message}</div>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};
