import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { fireDB } from "../FirebaseConfig/firebaseConfig";

export const GetAllMessages = async () => {
  try {
    let messages = [];
    const qry = query(collection(fireDB, "messages"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      messages.push({ ...doc.data() });
    });

    return {
      success: true,
      message: "The messages are fetched correctly",
      data: messages[0],
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const AddNewMessage = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "messages", "xfeF0kdDsMNLzR5yu4Pv"), {
      ...payload,
    });

    return {
      success: true,
      message: "The message is successfuly sent",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
