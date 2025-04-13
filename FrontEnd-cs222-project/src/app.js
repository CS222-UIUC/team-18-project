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

// async function sendData() {
//     const major = "major";  // input major
//     const data = { classes: [] };  // input classes

//     try {
//         // Send POST request to the backend (Django) running on localhost:8000
//         const response = await fetch(`http://localhost:8000/api/progress/minor/${major}/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         // Parse the response as JSON
//         const result = await response.json();
//         console.log('Response:', result);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Call the function to send data
// sendData();