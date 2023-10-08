import { generateId } from "../utils/GenerateId.js"

export class Folder {
  constructor(data) {
    this.id = data.id ? data.id : generateId()
    this.name = data.name
    this.color = data.color ? data.color : "#123456"
  }

  get folderCard() {
    return `
        <div onclick="app.NotesController.selectFolder('${this.id}')" class="btn card folder text-center shadow" style="background-color: ${this.color};">
          <i class="folderIcon mdi mdi-folder"></i>
          <p class="folderName fw-bold">${this.name}</p>
        </div>
        `
  }

  get folderList() {
    return `
    <option value="${this.name}">${this.name}</option>
    `
  }

  get noteListFolders() {
    return `
    <span class="fs-4 d-flex">
      <i class="pe-3 mdi mdi-folder" style="color: ${this.color};"></i>
      <p class="mb-0">${this.name}</p>
    </span>
    <div class="ps-3 pb-3">
    `
  }
}