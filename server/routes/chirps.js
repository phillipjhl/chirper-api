const express = require('express');
const chirpsstore = require('../chirpstore');

let router = express.Router();

router.get('/', (req, res) => {
    res.send('chirps');
});

module.exports = router;