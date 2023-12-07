import mongoose from 'mongoose';

const Savedschema = new mongoose.Schema({
    username: String,
    userid: String,
    altname: String,

}, {
    collection: 'Login-Information' // Specify the collection name
});

const Saved = mongoose.model('Saved', Savedschema);

export default Saved;