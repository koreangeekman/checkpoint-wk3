import { generateId } from "../utils/GenerateId.js";


export class Note {
  constructor(data) {
    this.id = data.id ? data.id : generateId()
    this.title = data.title
    this.folder = data.folder ? data.folder : 'General'
    this.folderColor = data.folderColor ? data.folderColor : '#123456'
    this.dateCreated = data.dateCreated ? data.dateCreated : new Date()
    this.updatedAt = data.updatedAt ? data.updatedAt : new Date()
    this.body = data.body ? data.body : ''
  }

  get noteList() {
    return `
    // include folder color based on category
    // include count
    
    `

  }
  get noteCard() {
    return `
    // include folder color based on category
    // include word & character counts

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