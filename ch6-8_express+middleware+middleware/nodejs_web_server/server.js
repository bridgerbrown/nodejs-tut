const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger }= require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// express reads top down

// custom middleware logger
// we need to call next bc the built-in middleware has next built-in, but custom doesn't
app.use(logger);

// built-in middleware to handle url encoded data
// in other words, form data: 'content-type: application/x-www-form-urlencoded'
// because we put this above all routes, this will apply to all routes below
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// built-in middleware for serving static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/employees', express.static(path.join(__dirname, './routes/api/employees')));

app.use('/', require('./routes/root'));

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
