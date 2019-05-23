// implement your API here

const express=require("express");
const db=require("./data/db.js");
const port = 4000;
const server=express(); // IMPORTANT TO USE EXPRESS
server.use(express.json());

// POST

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({error: "Please provide name and bio for the user."})
    }
    else {
        db.insert(newUser)
        .then(addedUser => {
        res.status(201).json(addedUser);
        })
        .catch(({ code, message }) => {
        res.status(500).json({ error: "There was an error while saving the user to the database"})
        })
    }
})


server.listen(4000, ()=> {
    console.log(`\n***Server Running on http://localhost:4000***\n`)
})