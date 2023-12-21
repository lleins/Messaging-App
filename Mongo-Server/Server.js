const app = express();
const port = process.env.PORT || 4000;
//import Saved from './models/Saved.js'; //For saved pics/vids
import Friend from './models/Friend.js'; //For loggin and creating account
import Add_Friend from './models/Added_Friend.js'; //For loggin and creating account
import Login from './models/Login.js'; //For loggin and creating account
import User from './models/User.js'; //For loggin and creating account
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

        const newUser_User = new User({ username: email_create, userid: "", status: 1 }); // Create and save the new user
        await newUser_User.save();

        return res.status(201).json({ message: 1 }); // User created successfully
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 0 }); // Server error
    }
});



//Create Account----------------------------------------------------------------------------------------



//Sign in------------------------------------------------------------------------------------------------

app.post('/api/login', (req, res) => { //Logging in
    const { username, password, user_id } = req.body;

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

                        User.findOneAndUpdate({ username: username }, { $set: { userid: user_id, status: 1 } }, { new: true })
                            .then(updatedUser => {

                            })
                            .catch(err => {
                                console.error('Error updating user:', err);
                            });

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




//Log out------------------------------------------------------------------------------------------------

app.post('/api/log_out', (req, res) => {
    const { username } = req.body;

    User.findOneAndUpdate({ username: username }, { $set: { status: 0 } }, { new: true })
        .then(updatedUser => {
            if (username) {
                res.status(200).json({ message: 1 });
                console.log("Password comparing success");
            } else {
                // Password comparison failed
                res.status(401).json({ message: 0 });
                console.log("Password Comparing Failed");
            }
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).json({ message: 3 });
        });
});



//Log out------------------------------------------------------------------------------------------------




//New User ID----------------------------------------------------------------------------------------------

app.post('/api/user_id', (req, res) => { //Logging in
    const { username, user_id } = req.body;

    User.findOneAndUpdate({ username: username }, { $set: { userid: user_id } }, { new: true })
        .then(updatedUser => {

            console.log('User updated:', updatedUser);
        })
        .catch(err => {
            console.error('Error updating user:', err);
        });

    res.status(200).json({ success: 1, message: 'Authentication successful' }); //sends token
    console.log("Password comparing success");

});
//New User ID----------------------------------------------------------------------------------------------


//Token Verification/Account Information ---------------------------------------------------------------------------------------------------------

/*
Login token verification process:
1. If logged in succesfully, Login Token generates in Server.js and gets sent to SignIn_Format.tsx.
2. Token then gets delcared as a cooking under variable name "Login_Token".
3. Token can now be accessed from variable name "Login_Token" via a cookie to verify user log in status.
4. Token contains email of user, secretkey is in .env file.
*/

app.post('/api/account_information', (req, res) => { //Grabbing Account Information
    const { username } = req.body;
    try {
        const Decoded_Login_Token = jsonwebtoken.verify(username, secretKey); //Decoded Token tested for validity
        console.log("username from Token in verification: ", Decoded_Login_Token.username);
        const Login_username = Decoded_Login_Token.username; //Uses email in payload to find user in database

        Login.findOne({ username: Login_username }) //Finds user with corresponding email
            .then((user) => {
                if (!user) {
                    console.log('User not found');
                    res.status(400).json({ success: 0, message: 'User not found' });
                } else {

                    res.status(200).json({ success: 1, message: 'Authentication successful', username: user.username }); //sends email and date as a reponse
                    console.log("Here is Data Sending to Account: ", user.username);
                }
            })


    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 0 }); // Server error
    }
});



//Token Verification/Account Information ---------------------------------------------------------------------------------------------------------



//Get friend Status---------------------------------------------------------------------------------------------------------

app.post('/api/get_status', (req, res) => {
    const { user_id } = req.body;

    User.findOne({ username: user_id })
        .then(user => {
            if (user) {
                const userStatus = user.status;
                console.log("Status: ", userStatus);
                res.status(200).json({ success: 1, status: userStatus });
            } else {

                res.status(404).json({ success: 0 });
            }
        })
        .catch(err => {
            res.status(500).json({ success: 0 });
        });
});

//Get friend Status---------------------------------------------------------------------------------------------------------


//Get friend id---------------------------------------------------------------------------------------------------------

app.post('/api/get_friend_id', (req, res) => {
    const { user } = req.body;

    User.findOne({ username: user })
        .then(user => {
            if (user) {
                const userid = user.userid;
                console.log("user id fofr 312312321: ", userid);
                res.status(200).json({ success: 1, id: userid });
            } else {

                res.status(404).json({ success: 0 });
            }
        })
        .catch(err => {
            res.status(500).json({ success: 0 });
        });
});

//Get friend id---------------------------------------------------------------------------------------------------------



//Friend Requests---------------------------------------------------------------------------------------------------------


app.post('/api/Send_Friend_Request', async (req, res) => {
    const { recipient, sender } = req.body;

    try {
        // Check if the recipient user exists in the login collection
        const recipientUser = await User.findOne({ username: recipient });

        if (!recipientUser) {
            res.status(200).json({ success: 0 }); // Recipient user does not exist
            return;
        }
        // Check if a friend request already exists in the Friend collection
        const existingFriendRequest = await Friend.findOne({ sender: sender, recipient: recipient });

        if (!existingFriendRequest) {
            // Check if a friend request already exists in the Add_Friend collection
            const existingAddFriendRequest = await Add_Friend.findOne({ sender: sender, recipient: recipient });

            if (!existingAddFriendRequest) {
                const newFriendRequest = new Friend({ recipient: recipient, sender: sender });
                await newFriendRequest.save();
                res.status(200).json({ success: 1 }); // Friend request created
            } else {
                res.status(200).json({ success: 4 }); // Friend request already exists in Add_Friend
            }
        } else {
            res.status(200).json({ success: 4 }); // Friend request already exists in Friend
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: 3 }); // Server error
    }
});






//Friend Requests---------------------------------------------------------------------------------------------------------









//Check Pending  ---------------------------------------------------------------------------------------------------------
app.post('/api/Check_Pending', (req, res) => {
    const { recipient } = req.body;
    try {

        let found_users = [];

        Friend.find({ recipient: recipient })
            .then((users) => {
                if (!users || users.length === 0) {
                    res.status(400).json({ success: 0 }); // Didn't find any pending
                } else {
                    found_users = users;
                    res.status(200).json({ success: 1, pending: found_users }); // Found
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ success: 3 }); // Server error
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: 4 }); // Server error
    }
});






//Check Pending  ---------------------------------------------------------------------------------------------------------




//Check Sent  ---------------------------------------------------------------------------------------------------------
app.post('/api/Check_Sent', (req, res) => {
    const { sender } = req.body;
    try {

        let found_users = [];

        Friend.find({ sender: sender })
            .then((users) => {
                if (!users || users.length === 0) {
                    res.status(400).json({ success: 0 }); // Didn't find any pending
                } else {
                    found_users = users;
                    res.status(200).json({ success: 1, sent: found_users }); // Found
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ success: 3 }); // Server error
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: 4 }); // Server error
    }
});






//Check Sent  ---------------------------------------------------------------------------------------------------------



//Add User  ---------------------------------------------------------------------------------------------------------
app.post('/api/Add_User', async (req, res) => {  //Creating Account
    const { username, friend, date_create } = req.body;

    const existingUser = await Add_Friend.findOne({ user: username, friend: friend });

    if (existingUser) {
        return res.status(409).json({ message: 3 }); // User already exists
    }
    try {

        const newUser_current = new Add_Friend({ user: username, friend: friend, date: date_create }); //saves friend to your account
        await newUser_current.save();

        const newUser_friend = new Add_Friend({ user: friend, friend: username, date: date_create }); ///saves you as a friend to friends account
        await newUser_friend.save();

        Friend.findOneAndRemove({ sender: friend, recipient: username }).exec();
        Friend.findOneAndRemove({ sender: username, recipient: friend }).exec();

        return res.status(201).json({ message: 1 }); // Friend succesfully added
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 0 }); // Server error
    }
})




//Add User  ---------------------------------------------------------------------------------------------------------


//Decline Friend Request  ---------------------------------------------------------------------------------------------------------

function Decline_Friend_Request(sender, recipient) {
    return Friend.findOneAndRemove({ sender: sender, recipient: recipient }).exec();
}

app.post('/api/decline_Request', (req, res) => {
    const { sender_data, recipient_data } = req.body

    Decline_Friend_Request(sender_data, recipient_data)
        .then(user => {
            if (user) {
                // User with the specified email and link removed
                res.status(200).json({ message: 1 });
            } else {
                // User not found
                return res.status(404).json({ message: 0 });
            }
        })
        .catch(err => {
            // Handle any errors that occurred during the removal
            res.status(500).json({ message: 3 });
        });
});


//Decline Friend Request ---------------------------------------------------------------------------------------------------------




//Get Friends  ---------------------------------------------------------------------------------------------------------


app.post('/api/Get_Friends', (req, res) => {
    const { username } = req.body;
    try {

        let found_users = [];

        Add_Friend.find({ user: username })
            .then((users) => {
                if (!users || users.length === 0) {
                    res.status(400).json({ success: 0 }); // Didn't find any pending
                } else {
                    found_users = users;
                    res.status(200).json({ success: 1, sent: found_users }); // Found
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ success: 3 }); // Server error
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: 4 }); // Server error
    }
});


//Get Friends ---------------------------------------------------------------------------------------------------------




//Remove Friend ---------------------------------------------------------------------------------------------------------


function Remove_Friend(username, friend) {
    return Add_Friend.findOneAndRemove({ user: username, friend: friend }).exec();
}

app.post('/api/Remove_Friend', (req, res) => {
    const { username, friend } = req.body

    Remove_Friend(username, friend)
        .then(user => {
            if (user) {
                // User with the specified email and link removed
                Add_Friend.findOneAndRemove({ user: friend, friend: username }).exec();
                res.status(200).json({ message: 1 });
            } else {
                // User not found
                return res.status(404).json({ message: 0 });
            }
        })
        .catch(err => {
            // Handle any errors that occurred during the removal
            res.status(500).json({ message: 3 });
        });
});

//Remove Friend ---------------------------------------------------------------------------------------------------------




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






























