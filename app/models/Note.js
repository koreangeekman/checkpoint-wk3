import { generateId } from "../utils/GenerateId.js";


export class Note {
  constructor(data) {
    this.id = data.id ? data.id : generateId()
    this.title = data.title
    this.folder = data.folder ? data.folder : 'General'
    this.folderColor = data.folderColor ? data.folderColor : '#123456'
    this.dateCreated = data.dateCreated ? new Date(data.dateCreated).toLocaleString() : new Date().toLocaleString()
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt).toLocaleString() : new Date().toLocaleString()
    this.body = data.body ? data.body : ''
  }

  get notesList() {
    return `
      <div onclick="app.NotesController.selectNote('${this.id}')" class="d-flex flex-row align-items-center my-3 btn card shadow noteList">
        <i class="folderColorIcon mdi mdi-circle" style="color: ${this.folderColor};"></i>
        <p class="ps-3 mb-0">${this.title}</p>
      </div>
    `

  }
  get noteMiniCard() {
    return `
      <div onclick="app.NotesController.selectNote('${this.id}')" class="btn card noteMiniCard text-center shadow">
        <i class="noteIcon mdi mdi-note-text"></i>
        <p class="noteName fw-bold backdrop">${this.title}</p>
      </div>
    `
  }

  // TODO add onclick/function for returning to folder
  // autosave? add 3?5min interval to trigger

  get noteCard() {
    return `
      <span class="d-flex align-items-center justify-content-between mb-3">
        <span class="fs-5 d-flex align-items-center">
          <i class="mdi mdi-circle" style="color: ${this.folderColor};"></i>
          <p class="mb-0">&nbsp [${this.folder}] > "${this.title}" </p>
          <i class="px-5 text-secondary mdi mdi-folder-arrow-up" onclick=""></i>
        </span>
        <i class="fs-4 btn btn-danger mdi mdi-trash-can" onclick="app.NotesController.removeNote('${this.id}')"></i>
      </span>
      <form onsubmit="app.NotesController.changeNote(event)">
        <span class="d-flex justify-content-between w-100">
          <label for="title">Title:</label>
          <input type="text" name="id" id="noteID" class="text-secondary w-25" value="${this.id}" required>
        </span>
        <input type="text" name="title" id="title" class="form-control" minlength="3" maxlength="15" value="${this.title}" required>
        <label for="folder">Folder</label>
        <select name="folder" id="noteCardFolderList" class="form-control" value="${this.folder}" required>
          <!-- FOLDERS LIST IS DRAWN -->
        </select>
        <textarea name="body" id="noteBody" class="form-control mt-3" cols="30" rows="10" required>${this.body}</textarea>
        <span class="d-flex justify-content-between">
          <button type="submit" class="btn btn-success m-3">Submit Changes</button>
          <span class="d-flex flex-column text-secondary align-items-start pe-2 pt-3">
            <small>Word Count: ${this.body.split(' ').length}</small>
            <small>Char Count: ${this.body.split('').length}</small>
          </span>
          <span class="d-flex flex-column text-secondary align-items-end pe-2 pt-3">
            <small>Created at: ${this.dateCreated}</small>
            <small>Updated at: ${this.updatedAt}</small>
          </span>
          
        </span>
      </form>
    `
  }

}