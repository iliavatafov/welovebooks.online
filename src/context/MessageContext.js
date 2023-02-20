import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

import { GetAllMessages } from "../apis/messages";

import { LoadingContext } from "./LoadingContext";

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messagesCounts, setMessagesCount] = useState(null);
  const [readMessages, setReadMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);

  const { showLoading, hideLoading, showModal, addModalMessage } =
    useContext(LoadingContext);

  useEffect(() => {
    showLoading();
    GetAllMessages()
      .then((res) => {
        hideLoading();
        if (res.success) {
          setReadMessages(res.data.read);
          setUnreadMessages(res.data.unread);
        } else {
          showModal();
          addModalMessage(res.message);
        }
      })
      .catch((error) => {
        hideLoading();
        showModal();
        addModalMessage(error.message);
      });
  }, [messagesCounts, showLoading, hideLoading, showModal, addModalMessage]);

  useEffect(() => {
    GetAllMessages().then((res) => {
      setMessagesCount(res.data.unread.length);
    });
  }, []);

  const increasMessagesCount = () => {
    setMessagesCount((count) => count + 1);
  };

  const decreaseMessagesCount = () => {
    setMessagesCount((count) => {
      if (count <= 0) {
        return 0;
      } else {
        return count - 1;
      }
    });
  };

  const updateReadMessages = (data) => {
    setReadMessages(data);
  };

  const updateUnreadMessages = (data) => {
    setUnreadMessages(data);
  };

  return (
    <MessagesContext.Provider
      value={{
        readMessages,
        unreadMessages,
        messagesCounts,
        updateReadMessages,
        updateUnreadMessages,
        increasMessagesCount,
        decreaseMessagesCount,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
