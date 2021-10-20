const fs = require('fs');
const util = require('util');
const {v1: uuidv1} = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
  read(){return readFileAsync('/db/db.json', 'utf8')}

  write(newNote){return writeFileAsync('/db/db.json', JSON.stringify(newNote)) }

  getNotes(){return this.read().then( (response) =>{ 
    return JSON.parse(response)
  } 
  )}

  addNote(note){ note.id = uuidv1() 
    this.getNotes().then( (noteArr) =>{
      noteArr.push(note);
      this.write(noteArr)
      return note
    })}
}

module.exports = new Notes()
