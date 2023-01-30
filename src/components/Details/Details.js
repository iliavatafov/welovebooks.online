import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { BookContext } from "../../context/BookContext";
import { LoadingContext } from "../../context/LoadingContext";
import { CartContext } from "../../context/CartContext";

import { GetUserProfile, UpdateUser } from "../../apis/users";

import { Rating } from "./Rating";
import { LoadingSpinner } from "../Spinner/Spinner";
import { AddToFavoritesBtn } from "./AddToFavoritesBtn";
import { DeleteFromFavoritesBtn } from "./DeleteFromFavoritesBtn";
import { Modal } from "../Modal/Modal";

import "../Details/Details.css";

export const Details = () => {
  const [userData, setUserData] = useState({});

  const { user, userLogin } = useContext(AuthContext);
  const { onDelete, books } = useContext(BookContext);
  const {
    showLoading,
    hideLoading,
    isLoading,
    showModal,
    isModal,
    addModalMessage,
    modalMessage,
  } = useContext(LoadingContext);
  const { noLoggedInUserAdd } = useContext(CartContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const bookData = books.find((b) => b.id === id);

  useEffect(() => {
    showLoading();
    GetUserProfile(user.id).then((res) => {
      setUserData(res.data);
      hideLoading();
    });
  }, [user]);

  const addToCart = async () => {
    if (userData) {
      const isBookAlreadyInCart = userData.cartData.some(
        (b) => b === bookData.id
      );

      if (!isBookAlreadyInCart) {
        userData.cartData.unshift(bookData.id);

        try {
          const response = await UpdateUser(userData);

          if (response.success) {
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
      } else {
        navigate("/cart");
      }
    } else {
      noLoggedInUserAdd();
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (cartItems) {
        const isBookInCart = cartItems.some((b) => b.id === bookData.id);

        if (!isBookInCart) {
          cartItems.push(bookData);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          navigate("/cart");
        } else {
          navigate("/cart");
        }
      } else {
        localStorage.setItem("cartItems", JSON.stringify([bookData]));
        navigate("/cart");
      }
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : isModal ? (
    <Modal message={modalMessage} />
  ) : (
    <section className="details-section">
      <div className="details-container">
        <header className="details-header">
          <div className="title-container">
            <h1 className="title">{bookData.title}</h1>
            <div className="author">{bookData.author}</div>
            <Rating bookData={bookData} user={user} id={id} />
          </div>
          <div className="price">{Number(bookData.price).toFixed(2)} BGN</div>
        </header>
        <main>
          <div className="img-container">
            <img src={bookData.imageUrl} alt="book" />
          </div>
          <div className="book-details">
            <div className="actions-wrapper">
              {!user.isAdmin && (
                <input
                  onClick={addToCart}
                  type="submit"
                  className="add-button"
                  value="Add to cart"
                />
              )}
              {user.isAdmin && (
                <>
                  <input
                    type="submit"
                    className="add-button"
                    value="Edit"
                    onClick={() => navigate(`/edit-book/${id}`)}
                  />
                  <input
                    onClick={() => onDelete(id)}
                    type="submit"
                    className="add-button"
                    value="Delete"
                  />
                </>
              )}
              {user.email &&
              !user.isAdmin &&
              !userData.favoriteBooks?.some((x) => x === id) ? (
                <AddToFavoritesBtn userData={userData} user={user} id={id} />
              ) : (
                user.email &&
                !user.isAdmin && (
                  <DeleteFromFavoritesBtn userData={userData} id={id} />
                )
              )}
            </div>
            <ul className="book-detail-list">
              <li className="list-item">
                <div className="title">Description</div>
                <div className="content">{bookData.description}</div>
              </li>
              <li className="list-item">
                <div className="title">Author</div>
                <div className="content">{bookData.author}</div>
              </li>
              <li className="list-item">
                <div className="title">Genre</div>
                <div className="content">{bookData.genre}</div>
              </li>
              <li className="list-item">
                <div className="title">Size</div>
                <div className="content">{bookData.size}</div>
              </li>
              <li className="list-item">
                <div className="title">N of pages</div>
                <div className="content">{bookData.pageCount}</div>
              </li>
              <li className="list-item">
                <div className="title">Year</div>
                <div className="content">{bookData.issueYear}</div>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </section>
  );
};
