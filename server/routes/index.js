const express = require('express');
const chirpRouter = require('./chirps');

let router = express.Router();

router.use('/api/chirps', chirpRouter);

module.exports = router;