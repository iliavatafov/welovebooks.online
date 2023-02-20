import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

import { CartContext } from "../../context/CartContext";

import "../Cart/Cart.css";

export const CartCard = ({ bookData, index }) => {
  const [selectedValue, setSelectedValue] = useState(1);
  const [total, setTotal] = useState(0);

  const {
    totalAmount,
    gatherPriceData,
    showRecapLayout,
    removeProductFromCart,
  } = useContext(CartContext);

  useEffect(() => {
    setTotal(Number(bookData.price) * Number(selectedValue));
    gatherPriceData(
      bookData.id,
      Number(bookData.price) * Number(selectedValue)
    );
  }, [
    selectedValue,
    totalAmount,
    bookData.id,
    bookData.price,
    gatherPriceData,
  ]);

  const onChange = (e) => {
    setSelectedValue(Number(e.target.value));
    gatherPriceData(
      bookData.id,
      Number(bookData.price) * Number(selectedValue)
    );
  };

  return (
    <>
      <li className="list-item">
        <div className="img-data-container">
          <div className="img-container">
            <img src={bookData.imageUrl} alt="book" />
          </div>
          <div className="book-data">
            <h3 className="title">{bookData.title}</h3>
            <p className="price">{Number(bookData.price).toFixed(2)} BGN</p>
          </div>
        </div>
        <div className="select-container">
          count
          {showRecapLayout ? (
            ` ${selectedValue}`
          ) : (
            <select
              onChange={onChange}
              name={bookData.id}
              className="select-options"
              defaultValue={selectedValue}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          )}
        </div>
        <div className="delete-price-container">
          {!showRecapLayout && (
            <button onClick={() => removeProductFromCart(index)}>
              Remove <i className="fas fa-times-circle"></i>
            </button>
          )}
          <p className="count-price">{total.toFixed(2)} BGN</p>
        </div>
      </li>
      <hr />
    </>
  );
};
