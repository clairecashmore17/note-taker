const path = require('path');

//use router for server instances

const router = require("express").Router();

//get our public notes html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
})

module.exports = router;