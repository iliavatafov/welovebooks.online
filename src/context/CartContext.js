import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import { BookContext } from "./BookContext";

import { UpdateUser } from "../apis/users";
import { GetUserProfile } from "../apis/users";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [productsToRender, setProductsToRender] = useState([]);
  const [booksPriceData, setBooksPriceData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [showRecapLayout, setShowRecapLayout] = useState(false);
  const [isUserAddingItemNoLogged, setIsUserAddingItemNoLogger] =
    useState(true);

  const { books } = useContext(BookContext);
  const { user, userLogin } = useContext(AuthContext);
  const { showLoading, hideLoading, showModal, addModalMessage } =
    useContext(LoadingContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      showLoading();
      GetUserProfile(user.id)
        .then((res) => {
          setUserData(res.data);
          hideLoading();
        })
        .catch((error) => {
          showModal();
          addModalMessage(error.message);
        });
    }
  }, [user]);

  useEffect(() => {
    let booksToRender = [];
    if (user.email && !user.isAdmin) {
      books.forEach((b) => {
        if (user.cartData.some((id) => id === b.id)) {
          booksToRender.unshift(b);
        }
      });
      setProductsToRender(booksToRender);
    } else {
      booksToRender = JSON.parse(localStorage.getItem("cartItems"));
      if (booksToRender) {
        setProductsToRender(booksToRender);
      }
    }
  }, [user, booksPriceData, books, isUserAddingItemNoLogged]);

  useEffect(() => {
    const sum = Object.values(booksPriceData).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    setTotalAmount(sum);
  }, [booksPriceData, productsToRender]);

  const removeProductFromCart = async (index) => {
    const updatedItems = [...productsToRender];
    updatedItems.splice(index, 1);

    let newBookPriceData = {};

    updatedItems.forEach((el) => (newBookPriceData[el.id] = Number(el.price)));

    if (!user.email) {
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      setBooksPriceData(newBookPriceData);
      const sum = Object.values(newBookPriceData).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotalAmount(sum);
      setProductsToRender(updatedItems);
    } else {
      try {
        const response = await UpdateUser({
          ...userData,
          cartData: updatedItems.map((b) => b.id),
        });

        if (response.success) {
          let newBookPriceData = {};

          Object.entries(booksPriceData).forEach((book) => {
            const [key, value] = book;
            if (response.data.cartData.some((el) => el === key)) {
              newBookPriceData[key] = value;
            }
          });

          setBooksPriceData(newBookPriceData);
          setProductsToRender(updatedItems);
          userLogin({ ...response.data, password: "" });
          navigate("/cart");
        } else {
          showModal();
          addModalMessage(response.message);
        }
      } catch (error) {
        showModal();
        addModalMessage(error.message);
      }
    }
  };

  const gatherPriceData = (id, value) => {
    setBooksPriceData((currentState) => {
      return {
        ...currentState,
        [id]: value,
      };
    });
  };

  const clearPriceData = () => {
    setBooksPriceData({});
  };

  const renderRecapLayout = (boolean) => {
    setShowRecapLayout(boolean);
  };

  const clearAllProductsInCart = () => {
    setProductsToRender([]);
  };

  const clearTotalAmount = () => {
    setTotalAmount(0);
  };

  const noLoggedInUserAdd = () => {
    setIsUserAddingItemNoLogger(!isUserAddingItemNoLogged);
  };

  return (
    <CartContext.Provider
      value={{
        userData,
        showRecapLayout,
        productsToRender,
        booksPriceData,
        totalAmount,
        removeProductFromCart,
        gatherPriceData,
        renderRecapLayout,
        clearAllProductsInCart,
        noLoggedInUserAdd,
        clearTotalAmount,
        clearPriceData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
