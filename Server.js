const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    const userId = socket.id;

    socket.emit('user connected', userId);

    console.log(`User connected with ID: ${userId}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected with ID: ${userId}`);
    });

    socket.on("recipient", (data) => {
        const { recipient_id } = data;
        console.log("Recipient ID:", recipient_id);

        const recipient_id_convert = String(recipient_id);
        console.log("Converted Recipient ID:", recipient_id_convert);

        const recipientSocket = io.to(recipient_id_convert);

        if (recipientSocket) {
            socket.emit('recipient exist', { message: "1" });
        } else {
            socket.emit('recipient exist', { message: "0" });
        }
    });

    socket.on('chat message', (data) => {
        const { recipientId, content } = data;

        const recipientSocket = io.to(recipientId);

        if (recipientSocket) {
            recipientSocket.emit('chat message', {
                content,
                senderId: userId,
            });
        } else {
            console.log(`Recipient with ID ${recipientId} not found.`);
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});