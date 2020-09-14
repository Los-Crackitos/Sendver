require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

// eslint-disable-next-line
console.info(`Tiny Email Sender is running on : ${port}`);
