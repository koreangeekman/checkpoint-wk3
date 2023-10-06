import { AppState } from "../AppState.js"
import { Folder } from "../models/Folder.js";
import { Note } from "../models/Note.js";
import { notesService } from "../services/NotesService.js"
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js";

function _drawFolders() {
  let contentHTML = '';
  AppState.folders.forEach(folder => contentHTML += folder.folderCard)
  setHTML('folderList', contentHTML)
}

function _drawNotesList() {
  let contentHTML = '';
  AppState.notes.forEach(note => contentHTML += note.noteList)
  setHTML('notesList', contentHTML)
}

function _drawNote(id) {
  let contentHTML = AppState.notes.find(note => note.id == id ? note.noteCard : null)
  if (!contentHTML) {
    Pop.error('Could not find a note with this ID');
    return
  }
  setHTML('notesCard', contentHTML);
}

function _drawStats() {
  setText('totalFolderCount', `Folders: ${AppState.folders.length}`)
  setText('totalNotesCount', `Notes: ${AppState.notes.length}`)
}

export class NotesController {

  constructor() {
    console.log('hello notes');
    _drawFolders();
    _drawStats();
    // AppState.on('notes', _drawNotesList)
  }

  addNote() { // accesses new note form

  }

  createNote(event) {
    try {
      event.preventDefault();
      notesService.createNote(getFormData(event.target));
      Pop.success('Note Created!');
      event.target.reset();
    } catch (error) {
      Pop.error('Something went wrong with form data collection..', error)
    }
  }

  removeNote(id) {
    notesService.removeNote(id);

    Pop.success('Note deleted 🚮');
  }

  selectNote(id) {
    notesService.selectNote(id);
    _drawNote(id);
  }

}