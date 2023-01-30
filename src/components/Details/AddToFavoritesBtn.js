import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import { UpdateUser } from "../../apis/users";

export const AddToFavoritesBtn = ({ userData, user, id }) => {
  const { userLogin } = useContext(AuthContext);
  const { showModal, addModalMessage } = useContext(LoadingContext);

  const navigate = useNavigate();

  const addToFavorites = async () => {
    const currentFavoriteBooks = userData.favoriteBooks;

    console.log(currentFavoriteBooks);

    let favoriteBooks = [];

    if (currentFavoriteBooks.length === 0) {
      favoriteBooks = [id];
    } else {
      favoriteBooks = [id, ...currentFavoriteBooks];
      console.log(favoriteBooks);
    }

    try {
      const result = await UpdateUser({
        ...userData,
        favoriteBooks,
        id: user.id,
      });
      if (result.success) {
        userLogin(result.data);
        navigate("/favorites");
      } else {
        showModal();
        addModalMessage(result.message);
      }
    } catch (error) {
      showModal();
      addModalMessage(error.message);
    }
  };
  return (
    <div className="favorites-wrapper">
      <button onClick={addToFavorites} type="submit" className="favorites-btn">
        <i className="far fa-heart"></i> Add to favorites
      </button>
    </div>
  );
};
