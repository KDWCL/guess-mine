const messages = document.querySelector("#jsMessage");
const sendMsg = document.querySelector("#jsSendMsg");

const appendMsg = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class=${nickname ? "out" : "self"}>${
    nickname ? nickname : "You"
  }: </span>
    <span class="content">${text} </span>
  `;
  messages.appendChild(li);
};

const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  input.value = "";
  appendMsg(value);
};
if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
