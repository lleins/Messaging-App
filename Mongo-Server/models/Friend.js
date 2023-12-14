import mongoose from 'mongoose';

const Friendschema = new mongoose.Schema({
    sender: String,
    recipient: String,
}, {
    collection: 'Friend-Requests' // Specify the collection name
});

const Friend = mongoose.model('Friend', Friendschema);

export default Friend;