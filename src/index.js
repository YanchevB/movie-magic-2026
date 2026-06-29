import express from 'express';

const app = express();

app.get('/', (res, req) => {
    req.send('Hello world!');
})

app.listen(3000, () => 
    console.log('Server is running on http://localhost:3000...'));