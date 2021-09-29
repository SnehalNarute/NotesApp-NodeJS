const fs = require('fs');

// to use functions from this file in any other file, we need to export the functions

var fetchNotes = () => {
    notes = [];
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (err) {
        // if file does not exist or it contains corrupted data
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var note = {title, body};
    var notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAllNotes = () => {
    return fetchNotes();
}

var getNote = (title) => {
    var notes = fetchNotes();
    var fetchedNote = notes.filter((note) => note.title === title);
    return fetchedNote[0];
}

var removeNote = (title) => {
    notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes.length !== notes.length;
}

var logNote = (note) => {
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote: addNote,
    getAllNotes: getAllNotes,
    getNote: getNote,
    removeNote: removeNote,
    logNote: logNote
}