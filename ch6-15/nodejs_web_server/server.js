const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger }= require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;

// express reads top down

// custom middleware logger
// we need to call next bc the built-in middleware has next built-in, but custom doesn't
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing 
app.use(cors(corsOptions));

// built-in middleware to handle url encoded data
// in other words, form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// built-in middleware for serving static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT); // everything after this line will need to verify JWT middleware
app.use('/employees', express.static(path.join(__dirname, './routes/api/employees')));

app.all('*', (req, res) => {
  // sending custom 404 file
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found"})
  } else {
    res.type('txt').send("404 Not Found")
  }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
