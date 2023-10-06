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

  get noteList() {
    return `
      <div onclick="app.NotesController.selectNote('${this.id}')" class="btn card notecard text-center shadow">
        <i class="noteIcon mdi mdi-note-text" style=""></i>
        <p class="noteName fw-bold backdrop">${this.title}</p>
      </div>
    `

  }
  // include word & character counts
  get noteCard() {
    return `
      <span class="d-flex align-items-center justify-content-between mb-3">
        <span class="d-flex align-items-center">
          <i class="mdi mdi-circle" style="color: ${this.folderColor};"></i>
          <p class="fs-4 mb-0">&nbsp [${this.folder}] > "${this.title}" </p>
        </span>
        <i class="fs-4 btn btn-danger mdi mdi-trash-can" onclick="app.NotesController.removeNote('${this.id}')"></i>
      </span>
      <form onsubmit="app.NotesController.changeNote(event)">
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" class="form-control" minlength="3" maxlength="15" value="${this.title}" required>
        <label for="folder">Folder</label>
        <select name="folder" id="noteCardFolderList" class="form-control" value="${this.folder}">
          <!-- FOLDERS LIST IS DRAWN -->
        </select>
        <textarea name="body" id="noteBody" class="form-control mt-3" cols="30" rows="10">${this.body}</textarea>
        <span class="d-flex justify-content-between">
          <button type="submit" class="btn btn-success m-3">Submit Changes</button>
          <span class="d-flex flex-column text-secondary align-items-end pe-2">
            <small>Created at: ${this.dateCreated}</small>
            <small>Updated at: ${this.updatedAt}</small>
          </span>
        </span>
      </form>
    `
  }

  get wordCount() {
    console.log(this.body.split(' ').length)
    return
  }

  get charCount() {
    console.log(this.body.split('').length)
    return
  }
}