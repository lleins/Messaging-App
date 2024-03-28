const express = require('express');
const app = express();
const https = require('https');
const server = https.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const cors = require('cors');

/*Socket--------------------------------------------------------------------------------*/
const io = new Server(server);

// Use cors middleware
app.use(cors());

io.on('connection', (socket) => {
    const userId = socket.id;
    socket.emit('user connected', userId);
    console.log(`User connected with ID: ${userId}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected with ID: ${userId}`);
    });

    //Checks if recipient exists-----------------------------------------------------------------
    socket.on("recipient", (data) => {
        const { recipient_id } = data;
        console.log("Recipient ID:", recipient_id);

        const recipient_id_convert = String(recipient_id);

        const recipientSocket = io.to(recipient_id_convert);

        if (recipientSocket) {
            socket.emit('recipient exist', { message: "1" });
        } else {
            socket.emit('recipient exist', { message: "0" });
        }
    });
    //Checks if recipient exists-----------------------------------------------------------------

    //Send message to User ID-----------------------------------------------------------------
    socket.on('chat message', (data) => {
        const { recipientId, content, name, img } = data;

        const recipientSocket = io.to(recipientId);

        if (recipientSocket) {
            recipientSocket.emit('chat message', {
                content,
                senderId: userId,
                name,
                img,

            });
        } else {
            console.log(`Recipient with ID ${recipientId} not found.`);
        }
    });
    //Send message to User ID-----------------------------------------------------------------

    //Send img to User ID-----------------------------------------------------------------
    socket.on('chat image', (data) => {
        const { recipientId, content, name, img } = data;

        const recipientSocket = io.to(recipientId);
        console.log("image data sent: ", content);
        if (recipientSocket) {
            recipientSocket.emit('chat image', {
                content,
                senderId: userId,
                name,
                img,
            });
        } else {
            console.log(`Recipient with ID ${recipientId} not found.`);
        }
    });
    //Send img to User ID-----------------------------------------------------------------


});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3000, () => {
    console.log('lstening on *:3000');
});
/*Socket--------------------------------------------------------------------------------*/
