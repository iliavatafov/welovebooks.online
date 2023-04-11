import { useEffect, useContext, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";

import { GetAllOrders } from "../../apis/orders";

import { OrderDetailsCard } from "./OrderDetailsCard";
import { Modal } from "../Modal/Modal";
import { LoadingSpinner } from "../Spinner/Spinner";

import "../Orders/Orders.css";

export const Orders = () => {
  const [layout, setLayout] = useState("Pending");
  const [orders, setOrders] = useState({
    pending: [],
    completed: [],
  });

  const {
    showLoading,
    hideLoading,
    isLoading,
    isModal,
    modalMessage,
    addModalMessage,
    showModal,
  } = useContext(LoadingContext);

  useEffect(() => {
    showLoading();
    GetAllOrders()
      .then((response) => {
        hideLoading();

        if (response.success) {
          setOrders({
            pending: response.data.filter((el) => el.status === "pending"),
            completed: response.data.filter((el) => el.status === "completed"),
          });
        } else {
          showModal();
          addModalMessage(response.message);
        }
      })
      .catch((error) => {
        hideLoading();
        showModal();
        addModalMessage(error.message);
      });
  }, [addModalMessage, showModal, showLoading, hideLoading]);

  const layoutChanger = (layout) => {
    setLayout(layout);
  };

  const manageOrders = (orders) => {
    setOrders(orders);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : isModal ? (
    <Modal message={modalMessage} />
  ) : (
    <div className="orders-container">
      <div className="header">
        <h1 className="title">
          {layout === "Pending" ? "Pending Orders" : "Completed Orders"}
        </h1>
        <div className="actions-container">
          <input
            type="submit"
            value="Pending"
            onClick={() => layoutChanger("Pending")}
          />
          <input
            type="submit"
            value="Completed"
            onClick={() => layoutChanger("Completed")}
          />
        </div>
      </div>
      <div className="dynamic-container">
        <ul className="orders-list">
          {layout === "Pending"
            ? orders.pending.map((el) => (
                <OrderDetailsCard
                  key={el.id}
                  orderData={el}
                  layout={layout}
                  orders={orders}
                  manageOrders={manageOrders}
                />
              ))
            : orders.completed.map((el) => (
                <OrderDetailsCard
                  key={el.id}
                  orderData={el}
                  layout={layout}
                  orders={orders}
                  manageOrders={manageOrders}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};
