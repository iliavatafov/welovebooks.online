import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import { UpdateUser } from "../../apis/users";
import { LoadingSpinner } from "../Spinner/Spinner";

export const AddToFavoritesBtn = ({ userData, user, id }) => {
  const { userLogin } = useContext(AuthContext);
  const { showModal, addModalMessage, showLoading, hideLoading, isLoading } =
    useContext(LoadingContext);

  const navigate = useNavigate();

  const addToFavorites = async () => {
    const currentFavoriteBooks = userData.favoriteBooks;

    let favoriteBooks = [];

    if (currentFavoriteBooks.length === 0) {
      favoriteBooks = [id];
    } else {
      favoriteBooks = [id, ...currentFavoriteBooks];
    }

    try {
      showLoading();
      const result = await UpdateUser({
        ...userData,
        favoriteBooks,
        id: user.id,
      });
      hideLoading();
      if (result.success) {
        userLogin(result.data);
        navigate("/favorites");
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
    <div className="favorites-wrapper">
      <button onClick={addToFavorites} type="submit" className="favorites-btn">
        <i className="far fa-heart"></i> Add to favorites
      </button>
    </div>
  );
};
