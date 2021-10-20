const fs = require('fs');
const util = require('util');
const { getNotes } = require('../db/dbFunctions');
const db = require('express').Router();

const notes = require('../db/dbFunctions');


// GET Route for retrieving diagnostic information
db.get('/notes', (req, res) => {
  notes.getNotes().then( (dbNotes) =>{return res.json(dbNotes)}) 
});
  


// POST Route for a error logging
db.post('/notes', (req, res) => {
  notes.addNote().then( (dbNotes) => {return res.json(dbNotes)})
});

module.exports = db;