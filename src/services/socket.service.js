import io from 'socket.io-client';

let socket = io('http://localhost:8080');
let listeners = [];

socket.on('connect', function() {
    listeners.forEach((listener) => listener('connect'));
});
socket.on('disconnect', function() {
    listeners.forEach((listener) => listener('disconnect'));
});
socket.on('connect_error', function() {
    listeners.forEach((listener) => listener(undefined, 'disconnect'));
});
socket.on('progress', (data) => {
    listeners.forEach((listener) => listener(data, 'progress'));
});
socket.on('start', (data) => {
    listeners.forEach((listener) => listener(data, 'start'))
});
socket.on('end', (data) => {
    listeners.forEach((listener) => listener(data, 'end'))
});

const addListener = (listener) => {
    listeners.push(listener);
};

const isConnected = () => {
    return socket.connected;
};

const removeAllListeners = () => {
    listeners = [];
};

const requestCancel = (uuid) => {
    console.log('Trying to cancel some shit...');
    socket.emit('cancel', uuid);
};

module.exports = {
    addListener: addListener,
    removeAllListeners: removeAllListeners,
    requestCancel: requestCancel,
    isConnected: isConnected
};