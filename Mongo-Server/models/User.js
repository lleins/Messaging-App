import mongoose from 'mongoose';

const Userschema = new mongoose.Schema({
    username: String,
    userid: String,

}, {
    collection: 'User-Information' // Specify the collection name
});

const User = mongoose.model('Saved', Userschema);

export default User;