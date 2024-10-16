const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyparser = require('body-parser');
require('./db/connection.js');
const router = require('./router/router');


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', router);


app.listen(9999, () => {
  console.log('Server running on port 9999');
});
