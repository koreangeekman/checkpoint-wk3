import { generateId } from "../utils/GenerateId.js"

export class Folder {
  constructor(data) {
    this.id = data.id ? data.id : generateId()
    this.name = data.name
    this.color = data.color ? data.color : "#123456"
  }

  get folderCard() {
    return `
        <div onclick="" class="btn card folder text-center shadow" style="background-color: ${this.color};">
          <i class="folderIcon text-secondary mdi mdi-folder"></i>
          <p class="folderName fw-bold">${this.name}</p>
        </div>
        `
  }
}