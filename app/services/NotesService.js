import { AppState } from "../AppState.js"
import { Folder } from "../models/Folder.js"
import { Note } from "../models/Note.js"
import { Pop } from "../utils/Pop.js"
import { saveState } from "../utils/Store.js"

function _saveNotes() {
  saveState('notes', AppState.notes)
}

function _saveFolders() {
  saveState('folders', AppState.folders)
}

function _setActiveFolder(id) {
  const folder = AppState.folders.find(folder => folder.id == id)
  AppState.activeFolder = folder;
}

function _setActiveNote(id) {
  const note = AppState.notes.find(note => note.id == id)
  AppState.activeNote = note;
  _setActiveFolder(AppState.folders.find(f => f.name == note.folder).id);
}

function _unsetActiveFolder() {
  AppState.activeFolder = null;
}

function _unsetActiveNote() {
  AppState.activeNote = null;
}

function _createFolder(noteData, quickNote) { //based on note data
  const checkFolderName = AppState.folders.findIndex(folder => folder.name == noteData.folder);
  if (checkFolderName == -1) {
    const newFolder = { name: noteData.folder, color: noteData.folderColor };
    AppState.folders.push(new Folder(newFolder));
    AppState.emit('folders');
    _saveFolders();
    Pop.success(`The new folder "${newFolder.name}" was created!`)
    return
  } else if (quickNote) {
    return
  }
  Pop.error(`Folder "${noteData.folder}" already exists`)
}

function _removeFolderCheck(folderName) {
  const folderCheck = AppState.notes.findIndex(note => note.folder == folderName)
  if (folderCheck == -1) {
    if (folderName == 'General') {
      console.log('Will not delete the default [General] notes folder');
      return
    }
    console.log(`No more notes in folder, remove ${folderName}?`);
    _removeFolder(folderName);
    return
  }
  console.log('There are still notes in ', folderName);
}

async function _removeFolder(folderName) {
  if (await Pop.confirm('Last note in folder deleted.. remove Folder?')) {
    const folderIndex = AppState.folders.findIndex(folder => folder.name == folderName)
    if (folderIndex == -1) {
      console.log('Unable to find folder, ', folderName);
      return
    }
    AppState.folders.splice(folderIndex, 1)
    AppState.emit('folders')
    _saveFolders();
    Pop.success('Folder deleted 🚮');
  }
}

function _assignFolderColorsToNotes() { // ensures correct folder color assignment to note
  AppState.folders.forEach(folder => {
    AppState.notes.filter(note => note.folder == folder.name ? note.folderColor = folder.color : null)
  })
}

function _compareData(newNoteData) {
  const activeNote = AppState.activeNote;
  if (newNoteData.title == activeNote.title && newNoteData.folder == activeNote.folder && newNoteData.body == activeNote.body) {
    return true; // true if everything is the same
  }
  console.log('something changed?');
  return false // false if there are any changes
}

function _overwriteData(newNoteData) {
  const activeNote = AppState.activeNote;
  if (newNoteData.title != activeNote.title) {
    activeNote.title = newNoteData.title;
  }
  if (newNoteData.folder != activeNote.folder) {
    activeNote.folder = newNoteData.folder;
  }
  if (newNoteData.body != activeNote.body) {
    activeNote.body = newNoteData.body;
  }
  activeNote.updatedAt = new Date().toLocaleString()
  console.log(activeNote);
}

class NotesService {  // NOTES SERVICE CLASS

  newFolder(folderData) {
    _createFolder({ folder: folderData.name, folderColor: folderData.color });
  }

  createNote(noteData, quickNote) {
    _createFolder(noteData, quickNote) // TODO split function? Complete new note including new folder + color opt?
    AppState.notes.push(new Note(noteData));
    _assignFolderColorsToNotes();
    _saveNotes();
    AppState.emit('notes');
  }

  changeNote(newNoteData) {
    const activeNote = AppState.activeNote;
    if (newNoteData.id == activeNote.id) {
      if (_compareData(newNoteData)) {
        console.log('No changes have been made');
        return
      }
    }
    _overwriteData(newNoteData);
    _assignFolderColorsToNotes();
    _saveNotes();
    AppState.emit('notes');
  }

  selectFolder(id) {
    _setActiveFolder(id);
    _unsetActiveNote();
    // console.log(AppState.activeFolder);
  }

  selectNote(id) {
    _setActiveNote(id);
    // console.log(AppState.activeNote);
  }

  clickOut() {
    _unsetActiveFolder();
    _unsetActiveNote();
  }

  removeNote(id) {
    const folderName = AppState.notes.find(note => note.id == id).folder;
    const index = AppState.notes.findIndex(note => note.id == id);
    AppState.notes.splice(index, 1);
    _removeFolderCheck(folderName) //checks if last note in folder, then removes
    _saveNotes();
    AppState.emit('notes');
  }

}

export const notesService = new NotesService()