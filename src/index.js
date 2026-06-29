import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

//Setup Handlebars

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('home', { layout: false });
})

app.listen(3000, () =>
    console.log('Server is running on http://localhost:3000...'));