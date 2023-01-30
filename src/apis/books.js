import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../FirebaseConfig/firebaseConfig";

import moment from "moment/moment";

export const GetAllBooks = async () => {
  try {
    let books = [];
    const qry = query(collection(fireDB, "books"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      message: "The books are fetched correctly",
      data: books,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const GetOneBook = async (bookId) => {
  try {
    let book = {};
    const qry = query(
      collection(fireDB, "books"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      if (doc.id === bookId) {
        book = { id: doc.id, ...doc.data() };
      }
    });
    return {
      success: true,
      message: "The books are fetched correctly",
      data: book,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const CreateBook = async (payload) => {
  try {
    const createdAt = moment().format("DD-MM-YYYY HH:mm A");
    const response = await addDoc(collection(fireDB, "books"), {
      createdAt,
      ...payload,
    });

    const bookData = await GetOneBook(response.id);

    return {
      success: true,
      message: "The book is successfuly added",
      data: bookData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const UpdateBook = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "books", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });

    return {
      success: true,
      message: "The book is successfully updated",
      data: payload,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
      data: null,
    };
  }
};

export const DeleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(fireDB, "books", bookId));
    return {
      success: true,
      message: "Book delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};
