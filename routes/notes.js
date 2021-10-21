const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const db = require('express').Router();
const util = require('util');


db.get('/notes', (req, res) => {
  util.promisify(fs.readFile)('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

db.post('/notes', (req, res) => {
  
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    // Convert the data to a string so we can save it
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const allTheNotes = JSON.parse(data) || [];
        console.log('----------', allTheNotes);

        allTheNotes.push(newNote);
      
      // Write the note to file
      fs.writeFile('./db/db.json', 
      JSON.stringify(allTheNotes, null, 4),
      (err) =>

        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.title} has been written to JSON file`
            )
      );
    }
  });
    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});



module.exports = db;