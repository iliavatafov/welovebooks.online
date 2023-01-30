import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDemensions";

import { MessagesContext } from "../../context/MessageContext";
import { LoadingContext } from "../../context/LoadingContext";

import { AddNewMessage } from "../../apis/messages";

import { LoadingSpinner } from "../Spinner/Spinner";
import { Modal } from "../Modal/Modal";
import { MessageCard } from "./MessageCard";

import "../Messages/Messages.css";

export const Messages = () => {
  const [isReadLayout, setIsReadLayout] = useState(false);
  const [isMobileView, setIsMobileView] = useState(true);

  const {
    isLoading,
    showLoading,
    hideLoading,
    showModal,
    isModal,
    addModalMessage,
    modalMessage,
  } = useContext(LoadingContext);
  const {
    increasMessagesCount,
    decreaseMessagesCount,
    readMessages,
    unreadMessages,
    updateReadMessages,
    updateUnreadMessages,
  } = useContext(MessagesContext);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 1500 && isMobileView !== false) {
      setIsMobileView(false);
    } else if (width <= 1500 && isMobileView !== true) {
      setIsMobileView(true);
    }
  }, [width, isMobileView]);

  const onMenuClick = (e) => {
    if (e.target.value === "Unread messages") {
      setIsReadLayout(false);
    } else {
      setIsReadLayout(true);
    }
  };

  const markAsRead = async (id) => {
    const message = unreadMessages.find((m) => m.id === id);

    const newUnreadMessages = unreadMessages.filter((m) => m.id !== id);
    const newReadMessages = [message].concat(readMessages);

    try {
      showLoading();
      const response = await AddNewMessage({
        read: newReadMessages,
        unread: newUnreadMessages,
      });
      hideLoading();
      if (response.success) {
        decreaseMessagesCount();
        updateReadMessages(newReadMessages);
        updateUnreadMessages(newUnreadMessages);
      } else {
        showModal();
        addModalMessage(response.message);
      }
    } catch (error) {
      hideLoading();
      showModal();
      addModalMessage(error.message);
    }
  };

  const markAsUnread = async (id) => {
    const message = readMessages.find((m) => m.id === id);

    const newReadMessages = readMessages.filter((m) => m.id !== id);
    const newUnreadMessages = [message].concat(unreadMessages);

    try {
      showLoading();
      const response = await AddNewMessage({
        read: newReadMessages,
        unread: newUnreadMessages,
      });

      hideLoading();

      if (response.success) {
        increasMessagesCount();
        updateReadMessages(newReadMessages);
        updateUnreadMessages(newUnreadMessages);
      } else {
        showModal();
        addModalMessage(response.message);
      }
    } catch (error) {
      showModal();
      addModalMessage(error.message);
    }
  };

  const deleteMessage = async (id) => {
    const newReadMessages = readMessages.filter((m) => m.id !== id);
    const newUnreadMessages = unreadMessages.filter((m) => m.id !== id);

    try {
      showLoading();
      const response = await AddNewMessage({
        read: newReadMessages,
        unread: newUnreadMessages,
      });
      hideLoading();

      if (response.success) {
        decreaseMessagesCount();
        updateReadMessages(newReadMessages);
        updateUnreadMessages(newUnreadMessages);
      } else {
        showModal();
        addModalMessage(response.message);
      }
    } catch (error) {
      showModal();
      addModalMessage(error.message);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : isModal ? (
    <Modal message={modalMessage} />
  ) : (
    <div className="messages-container">
      <div className="table-container">
        <div className="page-btns-container">
          <input
            onClick={onMenuClick}
            className={!isReadLayout ? "clicked-btn" : "standard-btn"}
            type="submit"
            value="Unread messages"
          />
          <input
            onClick={onMenuClick}
            className={isReadLayout ? "clicked-btn" : "standard-btn"}
            type="submit"
            value="Messages read"
          />
        </div>
        <table>
          {!isMobileView && (
            <thead>
              <tr className="table-head">
                <th className="column1">Date</th>
                <th className="column2">Name</th>
                <th className="column3">Email</th>
                <th className="column4">Message</th>
                <th className="column5">Actions</th>
              </tr>
            </thead>
          )}
          <tbody>
            {isReadLayout
              ? readMessages.map((m) => (
                  <MessageCard
                    key={m.id}
                    data={m}
                    markAs={markAsUnread}
                    read={true}
                    deleteMessage={deleteMessage}
                    isMobileView={isMobileView}
                  />
                ))
              : unreadMessages.map((m) => (
                  <MessageCard
                    key={m.id}
                    data={m}
                    markAs={markAsRead}
                    read={false}
                    deleteMessage={deleteMessage}
                    isMobileView={isMobileView}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
