import express from 'express';
import { engine } from 'express-handlebars';
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

const app = express();

//Setup Handlebars
app.engine('hbs', engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//Setup static files
app.use(express.static('./src/public'));

//Setup routes
app.use('/', homeController);
app.use('/movies', movieController);

//Start server
app.listen(3000, () =>
    console.log('Server is running on http://localhost:3000...'));