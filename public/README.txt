Raven Messaging App is an online application that uses socket.io and mongoDB. Outlined
below is a detailed description of how it works.

Cookies:
Raven uses no libraries for cookies. It uses js's default cookie functions to track 
login tokens. For tokens Raven uses JSWT for login tokens to verify identities.

Create Account:
Raven uses three fields to create account. It uses a username, password and re-password feild.
You must create an account with a username that is unique. If no other username exists in the database,
specifically in the Login-Information collection, and the passwords match then the users account gets created.
multiple documents get created upon account creation. A document containing username, passowrd and date gets created in the
Login-Information collection. Another in the User-Information collection with username, userID and status fields. Note all
passwords stored in the database are encrypted using the bycrypt library.


Login: 
Raven uses two fields to login, username and password. The password uses, as mentioned 
in the create account section, bycrypt to securely store passwords in the mongoDB database.
When logging in the provided username is used to find an existing document in the Login-Information
collection in the database. If the user is found, the entered password gets encrypted and compared
to the one saved in the database. If they match the user gets logged, their status changes to 1 and gets assigned
a login token in a cookie that expired in 1 day.








