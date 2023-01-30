import { useContext } from "react";

import { CartContext } from "../../context/CartContext";
import { LoadingContext } from "../../context/LoadingContext";

import { LoadingSpinner } from "../Spinner/Spinner";
import { CartCard } from "./CartCard";
import { NothingInTheCart } from "./NothingInTheCart";
import { PurchaseDataForm } from "./PurchaseDataFrom";

export const Cart = () => {
  const { isLoading } = useContext(LoadingContext);
  const { productsToRender, totalAmount } = useContext(CartContext);

  return isLoading ? (
    <LoadingSpinner />
  ) : productsToRender.length === 0 ? (
    <NothingInTheCart />
  ) : (
    <div className="cart-container">
      <h1 className="cart-title">
        <i className="fas fa-shopping-cart"></i> Shopping cart
      </h1>
      <ul className="cart-list">
        {productsToRender.map((item, index) => (
          <CartCard key={item.id} bookData={item} index={index} />
        ))}
      </ul>
      <div className="check-container">
        <h2>
          Total: <span>{totalAmount.toFixed(2)} BGN</span>
        </h2>
      </div>
      <PurchaseDataForm />
    </div>
  );
};
