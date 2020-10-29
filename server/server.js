const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1:27017/form', { useNewUrlParser: true })
	.then(() => console.log('database is connected'))
	.catch((err) => console.log('database connection error', err));
const app = express();
const apiPort = 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/save', require('./form-routes'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
