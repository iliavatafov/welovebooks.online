import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingContext } from "../../context/LoadingContext";

import { Modal } from "../Modal/Modal";

export const NothingInTheCart = () => {
  const { isModal, modalMessage } = useContext(LoadingContext);

  const navigate = useNavigate();

  const goToBooksPage = () => {
    navigate("/books");
  };

  return isModal ? (
    <Modal message={modalMessage} />
  ) : (
    <div className="no-products-container">
      <h2 className="title">You have no products in the cart yet</h2>
      <button onClick={goToBooksPage} type="submit">
        See our books
      </button>
    </div>
  );
};
