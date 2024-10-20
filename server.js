const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const bodyparser = require('body-parser');
require('./db/connection.js');
const router = require('./router/router');


app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', router);
app.use(express.static(path.join(__dirname, "./client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"./client/dist/index.html"),
    function(err){
        res.status(500).send(err)
    }
    )
})

app.listen(9999, () => {
  console.log('Server running on port 9999');
});
