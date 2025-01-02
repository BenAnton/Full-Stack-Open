/* eslint-disable react/prop-types */
const Notification = ({ message, notifyStyle }) => {
  const styles = {
    success: {
      border: "2px solid green",
      color: "green",
      backgroundColor: "lightgrey",
    },
    error: {
      border: "2px solid green",
      color: "red",
      backgroundColor: "lightgrey",
    },
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={styles[notifyStyle]} className="error">
      {message}
    </div>
  );
};

export default Notification;
