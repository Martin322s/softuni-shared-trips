const express = require('express');
const { initialDatabase } = require('../config/db');
const { initViewEngine } = require('../config/hbs');
const cookieParser = require('cookie-parser');
const router = require('./router');
const { auth } = require('./middlewares/authMiddleware');
const app = express();
const port = 3000;

initViewEngine(app);
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(router);

initialDatabase()
    .then(() => {
        console.log("Database initialized successfully!");
        app.listen(port, () => console.log(`Server is working at: http://localhost:${port}`));
    })
    .catch((error) => {
        console.log("Database error: " + error.message);
    });
