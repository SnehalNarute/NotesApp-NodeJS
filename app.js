const fs = require('fs');

const _ = require('lodash');

// import functionality from notes.js file
// notes.js will run automatically once this file runs
const notes = require('./notes.js');

// a module to parse command line input easily
const yargs = require('yargs');

const chalk = require('chalk');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    }).command('remove', 'Remove a note', {
        title: titleOptions
    }).command('read', 'Read a note', {
        title: titleOptions
    }).command('list', 'List all notes')
    .help()
    .argv;

// get the command line argument
var command = process.argv[2];

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log(chalk.black(chalk.bgGreen('New note Created')));
        notes.logNote(note);
    } else console.log(chalk.black(chalk.bgWhite('Title already taken!')));
}
else if (command === 'list') {
    var allNotes = notes.getAllNotes();
    console.log(chalk.white(chalk.bgBlue(`Printing ${allNotes.length} notes`)));
    allNotes.forEach((note) => notes.logNote(note));
}
else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    } else console.log(chalk.black(chalk.bgRed('Note not found')));
}
else if (command === 'remove') {
    if(notes.removeNote(argv.title)) {
        console.log(chalk.black(chalk.bgRed('Note Removed')))
        console.log(' --- ');
        console.log(chalk.black(chalk.bgGreen(`Title: ${argv.title}`)));
    } else console.log(chalk.black(chalk.bgRed('Note not found.')))
}
else console.log(chalk.black(chalk.bgWhite('command not recognized')));