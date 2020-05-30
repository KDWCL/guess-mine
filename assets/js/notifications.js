const notifications = document.querySelector("#jsNotifications");

const fireNotification = (text, color) => {
  const notification = document.createElement("span");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  notifications.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  fireNotification(`${nickname} just joined!`, "rgb(0, 122, 255)");
};

export const handleDisconnected = ({ nickname }) => {
  fireNotification(`${nickname} just joined!`, "rgb(255, 149, 0)");
};
