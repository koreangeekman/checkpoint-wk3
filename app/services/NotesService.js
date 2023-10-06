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
}

function _createFolder(noteData, quickNote) { //based on note data
  const checkFolderName = AppState.folders.findIndex(folder => folder.name == noteData.folder);
  // console.log('folder exists check', checkFolderName);
  if (checkFolderName == -1) {
    const newFolder = { name: noteData.folder, color: noteData.folderColor };
    AppState.folders.push(new Folder(newFolder));
    AppState.emit('folders');
    _saveFolders();
    Pop.success(`The new folder "${newFolder.name}" was created!`)
    console.log('New folder created!', newFolder);
    return
  } else if (quickNote) {
    return
  }
  Pop.error(`Folder "${noteData.folder}" already exists`)
  console.log('Folder already exists', noteData.folder);
}

function _removeFolder(folderName) {
  const folderCheck = AppState.notes.findIndex(note => note.folder == folderName)
  if (folderCheck == -1) {
    console.log('No more notes in folder, removing folder', folderName);
    const folderIndex = AppState.folders.findIndex(folder => folder.name == folderName)
    AppState.folders.splice(folderIndex, 1)
    AppState.emit('folders')
    _saveFolders();
    return
  }
  console.log('There are still notes in this folder', AppState.notes);
}


class NotesService {  // NOTES SERVICE CLASS

  newFolder(folderData) {
    _createFolder({ folder: folderData.name, folderColor: folderData.color })
  }

  createNote(noteData, quickNote) {
    _createFolder(noteData, quickNote)
    AppState.notes.push(new Note(noteData));
    _saveNotes();
  }

  selectFolder(id) {
    _setActiveFolder(id);
    console.log(AppState.activeFolder);
  }

  selectNote(id) {
    _setActiveNote(id);
    console.log(AppState.activeNote);
  }

  removeNote(id) {
    const folderName = AppState.notes.find(note => note.id == id ? note.folder : null);
    console.log(folderName);
    const index = AppState.notes.findIndex(note => note.id == id);
    AppState.notes.splice(index, 1)
    _removeFolder(folderName) //checks if last note in folder, then removes
    _saveNotes();
    Pop.success('Note deleted 🚮');

  }

}

export const notesService = new NotesService()