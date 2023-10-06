import { AppState } from "../AppState.js"
import { Folder } from "../models/Folder.js"
import { Note } from "../models/Note.js"
import { saveState } from "../utils/Store.js"

function _saveNotes() {
  saveState('notes', AppState.notes)
}

function _saveFolders() {
  saveState('folders', AppState.folders)
}

function _createFolder(noteData) {
  const checkFolderName = AppState.folders.find(folder => folder.name == noteData.folder);
  if (checkFolderName == -1) {
    const newFolder = { name: noteData.folder, color: noteData.color };
    AppState.notes.push(new Folder(newFolder));
    AppState.emit('folders');
    _saveFolders();
    console.log('New folder created!', newFolder);
  }
  console.log('Folder already exists', newFolder.name);
}

function _removeFolder(folderName) {
  const folderCheck = AppState.notes.findIndex(note => note.folder == folderName)
  if (folderCheck == -1) {
    const folderIndex = AppState.folders.findIndex(folder => folder.name == folderName)
    AppState.folders.splice(folderIndex, 1)
    AppState.emit('folders')
    _saveFolders();
    console.log('No more notes in folder, removing folder', folderName);
  }
  console.log('There are still notes in this folder', AppState.notes);
}

class NotesService {  // NOTES SERVICE CLASS

  createNote(noteData) {
    _createFolder(noteData)
    AppState.notes.push(new Note(noteData));
    _saveNotes();
  }

  removeNote(id) {
    const folderName = ''
    AppState.notes.find(note => note.id == id ? folderName = note.folder : null);
    const index = AppState.notes.findIndex(note => note.id == id);
    AppState.notes.splice(index, 1)
    _removeFolder(folderName) //checks if last, then removes
    _saveNotes();
  }

}

export const notesService = new NotesService()