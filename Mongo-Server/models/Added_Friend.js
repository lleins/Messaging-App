import mongoose from 'mongoose';

const Added_FriendSchema = new mongoose.Schema({
    user: String,
    friend: String,
    date: String,
}, {
    collection: 'Added-Users' // Specify the collection name
});

const Add_Friend = mongoose.model('Add_Friend', Added_FriendSchema);

export default Add_Friend;