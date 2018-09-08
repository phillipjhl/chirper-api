//module imports
const express = require('express');
const chirpsStore = require('../chirpstore');

let router = express.Router();

//get router
//if it has id, respond with one 
//else send all to client
router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        res.send(chirpsStore.GetChirps())
    };
});

//post router
//save resource sent from client
router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});

//put router
//update resource with data
router.put('/:id?', (req, res) => {
    let id = req.params.id;
    console.log(id);
    chirpsStore.UpdateChirp(id, res.body);
    res.sendStatus(200);
});

//delete router
//delete resource with id

module.exports = router;