import { AppState } from "../AppState.js"
import { notesService } from "../services/NotesService.js"
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js";

function _drawFolders() { //always drawn in the bg
  let contentHTML = '';
  AppState.folders.forEach(folder => contentHTML += folder.folderCard)
  setHTML('folderViewPort', contentHTML)
}

function _drawFolderList(location) { // for form selection
  let contentHTML = '';
  AppState.folders.forEach(folder => contentHTML += folder.folderList)
  setHTML(location, contentHTML)
}

function _drawNotesListALL() { // for offcanvas left listing
  let contentHTML = '';
  AppState.notes.forEach(note => contentHTML += note.notesList)
  setHTML('allNotesList', contentHTML)
}

function _drawNotesListInFolder() {
  let folder = AppState.activeFolder;
  let contentHTML = '';
  AppState.notes.forEach(note => note.folder == folder.name ? contentHTML += note.noteMiniCard : '')
  setHTML('notesList', contentHTML)
  document.getElementById('notesList').style.backgroundColor = folder.color;
  document.getElementById('z2').classList.add('d-none')
  document.getElementById('z1').classList.remove('d-none')
}

function _drawNote(id) {
  const noteD = AppState.notes.find(note => note.id == id)
  let contentHTML = noteD.noteCard
  if (!contentHTML) {
    Pop.error('Could not find a note with this ID');
    return
  }
  setHTML('notesCard', contentHTML);
  document.getElementById('notesList').style.backgroundColor = noteD.folderColor;
  document.getElementById('z1').classList.add('d-none')
  document.getElementById('z2').classList.remove('d-none')
}

function _drawStats() {
  setText('totalFolderCount', `Folders: ${AppState.folders.length}`)
  setText('totalNotesCount', `Notes: ${AppState.notes.length}`)
}

function _drawFoldersALL() {
  _drawStats(); // in header, total counts
  _drawFolders(); // for main background of folders draw
  _drawFolderList('folderList'); // for drop-down selection menu on 'quick note add' 
}

function _setFolder() {
  if (AppState.activeFolder) {
    document.getElementById('folderList').value = AppState.activeFolder.name;
    return
  }
  document.getElementById('folderList').value = 'General';
}

export class NotesController {

  constructor() {
    _drawFoldersALL();
    _drawNotesListALL();
    // _drawNotesListInFolder();
    // _drawNote();
    AppState.on('folders', _drawFoldersALL)
    AppState.on('notes', _drawNotesListALL)
    // AppState.on('notes', _drawNotesListInFolder)
  }


  selectFolder(id) {
    notesService.selectFolder(id);
    _setFolder();
    _drawNotesListInFolder();
  }

  selectNote(id) {
    notesService.selectNote(id);
    _drawNote(id);
    _drawFolderList('noteCardFolderList'); //for the form select option
    document.getElementById('noteCardFolderList').value = AppState.activeFolder.name;
  }

  newFolder(event) {
    try {
      event.preventDefault();
      notesService.newFolder(getFormData(event.target));
      event.target.reset();
      _drawFoldersALL();
      bootstrap.Offcanvas.getOrCreateInstance("#addNewFolder").hide();
    } catch (error) {
      Pop.error('Something went wrong with form data collection..[folders]')
      console.log('new folder attempt', error)
    }
  }

  createNote(event, quickNote) {
    try {
      event.preventDefault();
      notesService.createNote(getFormData(event.target), quickNote);
      event.target.reset();
      _drawFoldersALL();
      if (AppState.activeFolder) {
        _drawNotesListInFolder();
      }
      bootstrap.Offcanvas.getOrCreateInstance("#addNewNote").hide();
    } catch (error) {
      Pop.error('Something went wrong with form data collection..[notes]', error)
    }
  }

  changeNote(event) {
    try {
      event.preventDefault();
      notesService.changeNote(getFormData(event.target));
      event.target.reset();
    } catch (error) {
      Pop.error('Something went wrong with form data collection..[notes]', error)
    }
  }

  async removeNote(id) {
    if (!(await Pop.confirm('Delete note?'))) {
      return
    }
    notesService.removeNote(id);
    _drawNotesListInFolder();
    // _drawFoldersALL();
  }

  clickOut() {
    document.getElementById('z1').classList.add('d-none');
    document.getElementById('z2').classList.add('d-none');
    notesService.clickOut();
  }
}