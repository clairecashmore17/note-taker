const router = require("express").Router();
const { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');

//get notes that have been posted into data
router.get('/notes', (req,res) => {
    let results = notes;
    // console.log(results);
    // this send back to front end
    res.json(results);
})

//get a note based on ID
router.delete('/notes/:id', (req,res) => {
    // pass in the req to return a note
    res.send("DELETE request called");
    for(let i =0; i < notes.length; i++) {
        if(notes[i].id === req.params.id){
            notes.splice(i,1);
            return;
        }
    }
})

//post note when saved
router.post('/notes', (req,res) => {
    console.log(req.body);
    req.body.id = notes.length.toString();
    console.log(req.body.id);

    const body = req.body;

    //NOTE: Data file configuration
    /* 
        Data must be configured like:
        {
            notes: [
                {
                    data1: ""
                    data2: ""
                }
            ]
        }

        If it is configured like:
        [
            {
                data1: ""
                data2: ""
            }
        ]
        It WILL NOT WORK
    */
    notes.push(body);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify( {notes: notes}, null,2)
    )
    console.log(notes);
    res.json(body);
});

module.exports = router;