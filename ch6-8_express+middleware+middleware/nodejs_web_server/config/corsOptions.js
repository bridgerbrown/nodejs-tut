// Cross Origign Resource Sharing
const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5000', 
  'http://localhost:3500'
];
const corsOptions = {
  origin: (origin, callback) => {
    // after development, may want to remove !origin, and unnecessary dev urls
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error ('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
