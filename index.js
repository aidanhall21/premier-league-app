//require in necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const path = require('path');

//require our main router and instantiate an express app
const apiRouter = require('./api/api');
const app = express();

//use our middleware packages
app.use(bodyParser.json());
app.use(cors());
app.use(errorhandler());

//mount the main apiRouter to the /api endpoint
app.use('/api', apiRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);