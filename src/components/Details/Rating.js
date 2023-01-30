import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { BookContext } from "../../context/BookContext";
import { LoadingContext } from "../../context/LoadingContext";

import { UpdateBook } from "../../apis/books";

export const Rating = ({ bookData, user, id }) => {
  const { showLoading, hideLoading, showModal, addModalMessage } =
    useContext(LoadingContext);
  const { bookEdit } = useContext(BookContext);

  const ratingClass = "fas fa-star star-yellow";

  const navigate = useNavigate();

  const getRating = async (e) => {
    if (!user.email) {
      navigate("/login");
      return;
    }

    const userRating = Number(e.target.children[0].value);

    const { usersRated } = bookData.rating;

    let newUsersRatedArray = [];

    if (usersRated.length > 0) {
      const indexOfRating = usersRated.findIndex((el) => el.userId === user.id);

      if (indexOfRating >= 0) {
        usersRated.splice(indexOfRating, 1);
        usersRated.push({ userId: user.id, userRating });
        newUsersRatedArray = usersRated;
      } else {
        usersRated.push({ userId: user.id, userRating });
        newUsersRatedArray = usersRated;
      }
    } else {
      newUsersRatedArray.push({ userId: user.id, userRating });
    }

    const sumTotalRating = newUsersRatedArray
      .map((el) => el.userRating)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const averageRating = Math.round(
      sumTotalRating / newUsersRatedArray.length
    );

    try {
      showLoading();
      const response = await UpdateBook({
        id,
        ...bookData,
        rating: { rating: averageRating, usersRated: newUsersRatedArray },
      });
      hideLoading();
      if (response.success) {
        bookEdit(id, response.data);
      }
    } catch (error) {
      hideLoading();
      showModal();
      addModalMessage(error.message);
    }
  };

  return (
    <div className="stars">
      <i
        onClick={getRating}
        className={bookData.rating.rating > 0 ? ratingClass : "fas fa-star"}
      >
        <input type="hidden" defaultValue={1} />
      </i>
      <i
        onClick={getRating}
        className={bookData.rating.rating > 1 ? ratingClass : "fas fa-star"}
      >
        <input type="hidden" defaultValue={2} />
      </i>
      <i
        onClick={getRating}
        className={bookData.rating.rating > 2 ? ratingClass : "fas fa-star"}
      >
        <input type="hidden" defaultValue={3} />
      </i>
      <i
        onClick={getRating}
        className={bookData.rating.rating > 3 ? ratingClass : "fas fa-star"}
      >
        <input type="hidden" defaultValue={4} />
      </i>
      <i
        onClick={getRating}
        className={bookData.rating.rating > 4 ? ratingClass : "fas fa-star"}
      >
        <input type="hidden" defaultValue={5} />
      </i>
    </div>
  );
};
