const express = require('express');
const router = express.Router();

const createHandler = (req, res) => {
    res.status(201).send('Resource created successfully');
};

const readHandler = (req, res) => {
    res.status(200).send('Resource data');
};


const updateHandler = (req, res) => {
    res.status(200).send('Resource updated successfully');
};

const deleteHandler = (req, res) => {
    res.status(200).send('Resource deleted successfully');
};

router.post('/create', createHandler);
router.get('/read', readHandler);
router.put('/update', updateHandler);
router.delete('/delete', deleteHandler);

module.exports = router;