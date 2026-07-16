import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

// Setup Handlebars
app.engine('hbs', engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Setup static files
app.use(express.static('./src/public'));

// Setup body parser
app.use(express.urlencoded());

// Auth middlewares
app.use(authMiddleware);

// Setup routes
app.use(routes);

// Start server
app.listen(3000, () =>
    console.log('Server is running on http://localhost:3000...'));