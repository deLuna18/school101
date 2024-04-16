const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

const users = [
    { username: 'user@uc.com', password: '12345' },
    { username: 'alexa', password: 'thegreat' },
    { username: 'cedy', password: 'marie' }
];

// LogIn
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).send("Login successful!");
    } else {
        res.status(400).send("Invalid Credentials. Please try again!"); 
    }
});

// Route to serve the main page
app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "views/main.html")); 
});

// Default route, serve the login page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html")); 
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
