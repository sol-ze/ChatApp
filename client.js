const socket = io("http://localhost:3000");

const messageInput = document.getElementById("message");
const form = document.getElementById("send");
const mesageContainer = document.getElementById("message-container");

socket.on("message-from-server", (data) => {
  console.log(data.message);
  displayMessage(data.message, 2);
});

//clicking submit message
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;
  if (message == "") return;

  displayMessage(`You: ${message}`, 1);

  socket.emit("message-from-client", message);
  messageInput.value = "";
});

/**
 * displaying message on screen
 * @param {*} message
 * @param {*} clientId: <1,2> it's used for displaying messages in diffrent colors and diffrent positions
 */
function displayMessage(message, clientId) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.style.cssText =
    "box-shadow: 0 14px 18px 0 rgba(0,0,0,0.2);  width:fit-content;  height:fit-content; height: 50px; padding: 10px; border-radius: 15px; margin-bottom: 20px";
  if (clientId == 1) {
    messageElement.classList += " bg-primary";
  } else {
    messageElement.classList += " bg-light";
  }
  mesageContainer.append(messageElement);
}
