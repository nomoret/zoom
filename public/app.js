const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to Server ✅');
  socket.emit('message', '안녕하세요');
});
socket.on('message', (data) => {
  console.log('message', data);
});
socket.on('events', (data) => {
  console.log('event', data);
});
socket.on('exception', (data) => {
  console.log('event', data);
});
socket.on('disconnect', () => {
  console.log('Disconnected from Server ❌');
});
