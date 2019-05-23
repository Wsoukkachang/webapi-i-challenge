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


// GET

server.get('/api/users', (req, res) => {
    db.find()
    .then(allUsers => {
        res.json(allUsers);
    })
    .catch(({ code, message }) => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

// DELETE

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(removedUser => {
        if(removedUser) {
            res.json(removedUser)
        } 
        else {
            res.status(404).json({ message: "The user with specified ID does not exist "})
        }
    })
    .catch(({ code, message }) => {
        res.status(500).json({ err: "The user could not be removed" })
    })
})

// PUT

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const {name, bio} = req.body;

    db.update(id, newInfo)
    .then(updatedUser => {
        if(updatedUser) {
            if(!name || !bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user" })
            }
            else { 
            res.json(updatedUser);
            }
        } 
        else {
            res.status(404).json({ message: "The user with the specified does not exist" })
        }
    })
    .catch(({ code, message }) => {
        res.status(500).json({ error: "The user information could not be modified" });
    })
})

server.listen(4000, ()=> {
    console.log(`\n***Server Running on http://localhost:4000***\n`)
})