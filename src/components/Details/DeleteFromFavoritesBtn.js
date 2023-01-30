import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import { UpdateUser } from "../../apis/users";

export const DeleteFromFavoritesBtn = ({ userData, id }) => {
  const { user, userLogin } = useContext(AuthContext);
  const { showModal, addModalMessage } = useContext(LoadingContext);

  const navigate = useNavigate();

  const deleteFromFavorites = async () => {
    const currentFavoriteBooks = userData.favoriteBooks;

    const favoriteBooks = currentFavoriteBooks.filter((b) => b !== id);

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
      <button
        onClick={deleteFromFavorites}
        type="submit"
        className="favorites-btn"
      >
        <i className="far fa-heart"></i> Delete from favorites
      </button>
    </div>
  );
};
