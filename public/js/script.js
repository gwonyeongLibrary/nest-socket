const socket = io('/');

const getElementById = (id) => document.getElementById(id) || null;

// get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

const drawHelloStranger = (username) => {
  helloStrangerElement.innerText = `Hello ${username} Stranger:`;
};

const drawChattingBox = (username) => {
  chattingBoxElement.innerText = `${username} connected!`;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);

    drawNewChat(inputValue);
    event.target.elements[0].value = '';
  }
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
  <div>
    ${message}
  </div>
  `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

socket.on('user_connected', (username) => {
  drawChattingBox(username);
  console.log(`${username} connected!`);
});

socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username} : ${chat}`);
});

function init() {
  helloUser();
  // submit 이벤트를 실행하는 순간 함수를 실행시킨다.
  formElement.addEventListener('submit', handleSubmit);
}
init();
