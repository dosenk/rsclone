const express = require('express');
const path = require('path');
const app = express();
const APP_PATH = '/rsClone';
app.use(express.static(__dirname + APP_PATH));

const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + APP_PATH, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname + APP_PATH, 'login.html'));
});


app.listen(PORT, () => {
    console.log('Server has been started...');
})