import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../FirebaseConfig/firebaseConfig";

import moment from "moment/moment";

export const GetAllOrders = async () => {
  try {
    let orders = [];
    const qry = query(collection(fireDB, "orders"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    orders.sort((a, b) =>
      moment(b.createdAt, "DD-MM-YYYY HH:mm A").diff(
        moment(a.createdAt, "DD-MM-YYYY HH:mm A")
      )
    );

    return {
      success: true,
      message: "The orders are fetched correctly",
      data: orders,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const CreateOrder = async (payload) => {
  try {
    const createdAt = moment().format("DD-MM-YYYY HH:mm A");
    const response = await addDoc(collection(fireDB, "orders"), {
      createdAt,
      ...payload,
    });

    return {
      success: true,
      message: "Thanks for your order!",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const UpdateOrder = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "orders", payload.id), {
      ...payload,
    });

    return {
      success: true,
      message: "Order is successfully updated",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
      data: null,
    };
  }
};

export const DeleteOrder = async (oredrId) => {
  try {
    await deleteDoc(doc(fireDB, "orders", oredrId));
    return {
      success: true,
      message: "Order delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};
