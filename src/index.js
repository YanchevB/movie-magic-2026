import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes.js';
import cookieParser from 'cookie-parser';
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

// Setup cookie parser
app.use(cookieParser());

// Auth middlewares
app.use(authMiddleware);

// Setup routes
app.use(routes);

// Start server
app.listen(3000, () =>
    console.log('Server is running on http://localhost:3000...'));