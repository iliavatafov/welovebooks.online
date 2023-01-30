export const MessageCard = ({
  data,
  markAs,
  read,
  deleteMessage,
  isMobileView,
}) => {
  return (
    <tr>
      <td className="column1">
        <div>
          {isMobileView && "Date: "}
          {data.createdAt}
        </div>
      </td>
      <td className="column2">
        <div>
          {" "}
          {isMobileView && "Name: "}
          {data.name}
        </div>
      </td>
      <td className="column3">
        <div>
          {" "}
          {isMobileView && "Email: "}
          {data.email}
        </div>
      </td>
      <td className="column4">
        <div>
          {" "}
          {isMobileView && "Message: "}
          {data.message}
        </div>
      </td>
      <td className="column5">
        <div>
          <input
            onClick={() => markAs(data.id)}
            className="btn-mark-as-read"
            type="submit"
            value={read ? "Mark as unread" : "Mark as read"}
          />
          <input
            onClick={() => deleteMessage(data.id)}
            className="btn-delete"
            type="submit"
            value="Delete"
          />
        </div>
      </td>
    </tr>
  );
};
