const socket = io('http://localhost:3000');

const welcome = document.querySelector('#welcome');
const welcomeForm = welcome.querySelector('form');
const room = document.getElementById('room');

let roomName = '';

function init() {
  room.hidden = true;
}

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.append(li);
}

function handleNickNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#name input');
  socket.emit('nickname', input.value);
  input.value = '';
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#message input');
  socket.emit('message', input.value, roomName, (res) => {
    addMessage(`You: ${res}`);
  });
  input.value = '';
}

function showRoom() {
  console.log('enter');
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = roomName;

  const nameForm = room.querySelector('#name');
  nameForm.addEventListener('submit', handleNickNameSubmit);

  const messageForm = room.querySelector('#message');
  messageForm.addEventListener('submit', handleMessageSubmit);
}

init();

socket.on('connect', () => {
  console.log('Connected to Server ✅');
});
socket.on('message', addMessage);

socket.on('welcome', (user) => {
  addMessage(`${user} joined`);
});

socket.on('bye', (user) => {
  addMessage(`${user} left`);
});

socket.on('exception', (data) => {
  console.log('event', data);
});
socket.on('disconnect', () => {
  console.log('Disconnected from Server ❌');
});

welcomeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = welcomeForm.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
});
