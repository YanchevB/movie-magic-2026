import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

//Setup Handlebars
app.engine('hbs', engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//Setup static files
app.use(express.static('./src/public'));

//Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () =>
    console.log('Server is running on http://localhost:3000...'));