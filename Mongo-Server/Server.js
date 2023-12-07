const app = express();
const port = process.env.PORT || 4000;
import Saved from './models/Saved.js'; //For saved pics/vids
import Login from './models/Login.js'; //For loggin and creating account
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';



dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Running...');
});


const secretKey = process.env.JWT_SECRET;




//Create Account----------------------------------------------------------------------------------------

async function HashPassword(pass) {
    const hashedValue = await bcrypt.hash(pass, 10); //bcrypt
    return hashedValue;
}

app.post('/api/create_account', async (req, res) => {  //Creating Account
    const { email_create, password_create, date_create } = req.body;

    const existingUser = await Login.findOne({ username: email_create });

    if (existingUser) {
        return res.status(409).json({ message: 3 }); // User already exists
    }
    try {
        const hashedPassword = await HashPassword(password_create);

        const newUser = new Login({ username: email_create, password: hashedPassword, date: date_create }); // Create and save the new user
        await newUser.save();

        return res.status(201).json({ message: 1 }); // User created successfully
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 0 }); // Server error
    }
});



//Create Account----------------------------------------------------------------------------------------



//Sign in------------------------------------------------------------------------------------------------

app.post('/api/login', (req, res) => { //Logging in
    const { username, password } = req.body;

    Login.findOne({ username: username }) //checks account with duplicate email
        .then(user => {
            if (!user) {
                // User not found
                console.log('User not found');
                res.status(400).json({ success: 0, message: 'User not found' });
            } else {
                bcrypt.compare(password, user.password, (err, result) => { //compares hashed passwords
                    if (err) {
                        res.status(401).json({ success: 0, message: 'Authentication failed' }); //Server failed/Issue
                        console.log("Error Comparing");
                        return;
                    }
                    if (result) {
                        const token = jsonwebtoken.sign( //Assigns a login token
                            {
                                username: user.username,
                            },
                            secretKey, // Replace with your actual secret key
                            {
                                expiresIn: '1d', // Token expiration time (e.g., 1 hour)
                            }
                        );

                        res.status(200).json({ success: 1, message: 'Authentication successful', token: token, }); //sends token
                        console.log("Password comparing success");
                    } else {
                        res.status(401).json({ success: 0, message: 'Authentication failed' }); //failed
                        console.log("Password Comparing Failed");
                    }
                });
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.status(500).json({ success: 0, message: 'Server error' }); //Error with server communication
        });


});


//Sign in------------------------------------------------------------------------------------------------




mongoose.connect('mongodb://127.0.0.1:27017/Raven', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PP_Login_Connection = mongoose.connection; //establish connection to database

PP_Login_Connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
PP_Login_Connection.once('open', () => {
    console.log('Connected to MongoDB - Raven');
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






























