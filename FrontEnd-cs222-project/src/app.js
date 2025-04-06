const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/second', (req, res) => {
    res.send('Welcome to the Sconed Page!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});