import mongoose from 'mongoose';

const LoginSchema = new mongoose.Schema({
    username: String,
    password: String,
    date: String
}, {
    collection: 'Login-Information' // Specify the collection name
});

const Login = mongoose.model('Login', LoginSchema);

export default Login;