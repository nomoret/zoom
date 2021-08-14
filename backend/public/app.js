const socket = io('http://localhost:3000');

const welcome = document.querySelector('#welcome');
const welcomeForm = welcome.querySelector('form');
const room = document.getElementById('room');
const messageButton = room.querySelector('#message button');

let roomName = '';

function init() {
  room.hidden = true;
  messageButton.disabled = true;
}

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.append(li);
}

function handleEnterRoomSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

function handleNickNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#name input');
  socket.emit('nickname', input.value, disableNameForm);
  messageButton.disabled = false;
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#message input');
  socket.emit('message', input.value, roomName, (res) => {
    addMessage(`You: ${res}`);
  });
  input.value = '';
}

function disableNameForm(nickname) {
  const nameForm = document.getElementById('name');
  nameForm.disabled = true;
  nameForm.childNodes.forEach((node) => {
    node.disabled = true;
  });

  console.log(nickname);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = roomName;

  const nameForm = room.querySelector('#name');
  nameForm.addEventListener('submit', handleNickNameSubmit);

  const messageForm = room.querySelector('#message');
  messageForm.addEventListener('submit', handleMessageSubmit);
}

function showRoomList(rooms) {
  const roomList = welcome.querySelector('ul');
  roomList.innerText = '';
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
}

function showJoinUser(user, userCount) {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${userCount})`;
  addMessage(`${user} joined`);
}

init();

socket.on('connect', () => {
  console.log('Connected to Server ✅');
});

socket.on('message', addMessage);

socket.on('room_change', showRoomList);

socket.on('welcome', showJoinUser);

socket.on('bye', (user) => {
  addMessage(`${user} left`);
});

socket.on('exception', (data) => {
  console.log('event', data);
});

socket.on('disconnecting', (res) => {
  console.log(`Disconnecting from Server - ${res}`);
});
socket.on('disconnect', () => {
  console.log('Disconnected from Server ❌');
});

welcomeForm.addEventListener('submit', handleEnterRoomSubmit);
