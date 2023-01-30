import { useContext } from "react";

import { LoadingContext } from "../../context/LoadingContext";

import { DeleteOrder, UpdateOrder } from "../../apis/orders";

import { Modal } from "../Modal/Modal";
import { LoadingSpinner } from "../Spinner/Spinner";

import "../Orders/OrderDetailsCard.css";

export const OrderDetailsCard = ({
  orderData,
  layout,
  orders,
  manageOrders,
}) => {
  const {
    isLoading,
    showLoading,
    hideLoading,
    showModal,
    addModalMessage,
    modalMessage,
    isModal,
  } = useContext(LoadingContext);

  const changeOrderStatus = async (newStatus) => {
    if (newStatus === "Pending") {
      try {
        showLoading();
        const response = await UpdateOrder({ ...orderData, status: "pending" });
        hideLoading();
        if (response.success) {
          const pending = [
            { ...orderData, status: "pending" },
            ...orders.pending,
          ];
          const completed = orders.completed.filter(
            (el) => el.id !== orderData.id
          );
          manageOrders({
            pending,
            completed,
          });
        } else {
          addModalMessage(response.message);
          showModal();
        }
      } catch (error) {
        hideLoading();
        addModalMessage(error.message);
        showModal();
      }
    } else {
      try {
        showLoading();
        const response = await UpdateOrder({
          ...orderData,
          status: "completed",
        });
        hideLoading();
        if (response.success) {
          const pending = orders.pending.filter((el) => el.id !== orderData.id);
          const completed = [
            { ...orderData, status: "pending" },
            ...orders.completed,
          ];
          manageOrders({
            pending,
            completed,
          });
        } else {
          addModalMessage(response.message);
          showModal();
        }
      } catch (error) {
        hideLoading();
        addModalMessage(error.message);
        showModal();
      }
    }
  };

  const deleteOrder = async () => {
    try {
      showLoading();
      const response = await DeleteOrder(orderData.id);
      hideLoading();
      if (response.success) {
        const pending = orders.pending.filter((el) => el.id !== orderData.id);
        const completed = orders.completed.filter(
          (el) => el.id !== orderData.id
        );
        manageOrders({
          pending,
          completed,
        });
      } else {
        addModalMessage(response.message);
        showModal();
      }
    } catch (error) {
      addModalMessage(error.message);
      showModal();
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : isModal ? (
    <Modal message={modalMessage} />
  ) : (
    <li className="list-item-wrapper">
      <div className="content-container">
        <h3>Delivery data</h3>
        <ul className="content-list">
          <li className="list-item">
            <span>Created At:</span> {orderData.createdAt}
          </li>
          <li className="list-item">
            <span>Name:</span> {orderData.name}
          </li>
          <li className="list-item">
            <span>Email:</span> {orderData.email}
          </li>
          <li className="list-item">
            <span>Phone Number:</span> {orderData.phoneNumber}
          </li>
          <li className="list-item">
            <span>Postal Code:</span> {orderData.postalCode}
          </li>
          <li className="list-item">
            <span>Address:</span> {orderData.address}
          </li>
        </ul>
      </div>
      <div className="books-boxlist-container">
        <h3>Books</h3>
        <ul className="books-boxlist">
          {orderData.products.map((el, index) => {
            return (
              <li className="list-item" key={el.id}>
                <span>{index + 1}.</span> {el.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="buttons-wrapper">
        <input
          className="btn-mark-as-read"
          type="submit"
          value={layout === "Pending" ? "Complete" : "Mark As Pending"}
          onClick={() =>
            changeOrderStatus(layout === "Pending" ? "Complete" : "Pending")
          }
        />
        <input
          className="btn-delete"
          type="submit"
          value="Delete"
          onClick={deleteOrder}
        />
      </div>
    </li>
  );
};
