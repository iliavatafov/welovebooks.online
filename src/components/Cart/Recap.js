import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { LoadingContext } from "../../context/LoadingContext";

import { CreateOrder } from "../../apis/orders";
import { UpdateUser } from "../../apis/users";

import { LoadingSpinner } from "../Spinner/Spinner";

import "../Cart/Recap.css";

export const Recap = ({ inputValues, clearInputValues }) => {
  const { showLoading, hideLoading, isLoading, showModal, addModalMessage } =
    useContext(LoadingContext);
  const { user, userLogin } = useContext(AuthContext);
  const {
    productsToRender,
    totalAmount,
    renderRecapLayout,
    clearAllProductsInCart,
    userData,
    clearTotalAmount,
    clearPriceData,
  } = useContext(CartContext);

  const onEdit = () => {
    renderRecapLayout(false);
    clearTotalAmount();
  };

  const onOrder = async () => {
    const trimedInput = {};
    Object.entries(inputValues).map((el) => {
      trimedInput[el[0]] = el[1].trim();
    });
    try {
      showLoading();
      const response = await CreateOrder({
        ...trimedInput,
        status: "pending",
        products: productsToRender,
      });
      renderRecapLayout(false);
      hideLoading();
      if (response.success) {
        clearAllProductsInCart();
        clearInputValues();
        clearPriceData();
        clearTotalAmount();
        if (user.email) {
          const newUserData = {
            ...userData,
            cartData: [],
          };
          await UpdateUser(newUserData);
          userLogin(newUserData);
          clearPriceData();
        } else {
          localStorage.clear();
        }
        showModal();
        addModalMessage(response.message);
      } else {
        showModal();
        addModalMessage(response.message);
      }
    } catch (error) {
      hideLoading();
      showModal();
      addModalMessage(error.message);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="recap-container">
      <h2 className="title">Your order</h2>
      <hr />
      <div className="order-details">
        <ul className="delivery-list">
          <h2>Address data</h2>
          <li className="list-item">
            <span>City: </span>
            {inputValues.city}
          </li>
          <li className="list-item">
            <span>Postal code: </span>
            {inputValues.postalCode}
          </li>
          <li className="list-item">
            <span>Address: </span>
            {inputValues.address}
          </li>
        </ul>
        <ul className="contact-list">
          <h2>Contact data</h2>
          <li className="list-item">
            <span>Email: </span>
            {inputValues.email}
          </li>
          <li className="list-item">
            <span>Name: </span>
            {inputValues.name}
          </li>
          <li className="list-item">
            <span>Phone number: </span>
            {inputValues.phoneNumber}
          </li>
        </ul>
      </div>
      <hr />
      <div className="check-container">
        <h3>
          Products: <span>{totalAmount.toFixed(2)}</span>
        </h3>
        <h3>
          Delivery: <span>3.00 BGN</span>
        </h3>
        <h2>
          Total amount: <span>{(totalAmount + 3).toFixed(2)} BGN</span>
        </h2>
        <div className="buttons-container">
          <button onClick={onEdit} className="next-btn edit">
            Edit
          </button>
          <button onClick={onOrder} className="next-btn order">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};
