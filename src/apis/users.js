import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../FirebaseConfig/firebaseConfig";

export const GetAllUsers = async () => {
  try {
    let users = [];
    const qry = query(collection(fireDB, "users"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      message: "Users are fetched correctly",
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const GetUserProfile = async (id) => {
  try {
    const docRef = doc(fireDB, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "Not such document!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const UpdateUser = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "users", payload.id), {
      ...payload,
    });
    return {
      success: true,
      message: "User updated successfylly",
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
