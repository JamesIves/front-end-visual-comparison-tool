import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function verifyPath(path, cb) {
  socket.emit('verifyPath', path);
  socket.on('verified', verification => cb(verification));
}

export { verifyPath };