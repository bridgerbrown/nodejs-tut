const corsOptions = {
  origin: (origin, callback) => {
    // after development, may want to remove !origin, and unnecessary dev urls
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error ('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
