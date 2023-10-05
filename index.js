const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

// Load user data from user.json
const userData = require('./user.json');

/*
- Create new HTML file named home.html
- Add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to the client
*/

// Create the home.html file
const homeHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to ExpressJs Tutorial</title>
</head>
<body>
    <h1>Welcome to ExpressJs Tutorial</h1>
</body>
</html>
`;

// Write the HTML content to home.html
// fs.writeFileSync('home.html', homeHtml);

// Serve the home.html file
router.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// Return all details from user.json file to the client as JSON
router.get('/profile', (req, res) => {
    res.json(userData);
});

// Modify /login route to accept username and password as query string parameters
router.get('/login', (req, res) => {
    const { username, password } = req.query;

    // Check if the provided username and password match the user data
    if (userData.username === username && userData.password === password) {
        res.json({
            status: true,
            message: "User Is valid",
        });
    } else {
        res.json({
            status: false,
            message: "User Name or Password is invalid",
        });
    }
});

// Modify /logout route to accept username as a parameter and display a message in HTML format
router.get('/logout/:username', (req, res) => {
    const { username } = req.params;

    // Create an HTML message
    const message = `<b>${username} successfully logged out.</b>`;

    // Send the message as the response
    res.send(message);
});

// Use the router middleware
app.use('/', router);

// Start the Express server
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log('Web Server is listening at port ' + port);
});
