import { Folder } from "./models/Folder.js"
import { Note } from "./models/Note.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/IsValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  // SECTION GLOBAL VARIABLES

  folders = [
    // new Folder({ name: 'General', color: '#123456' }),
    // new Folder({ name: 'ToDo', color: '#EE3456' }),
    // new Folder({ name: 'Private', color: '#121212' })
  ]

  notes = [
    // new Note({ title: 'ToDo List', body: "some ToDo text", folder: 'ToDo', folderColor: '#EE3456' }),
    // new Note({ title: 'ooga', body: "some general text" }),
    // new Note({ title: 'private note', body: "some Private text", folder: 'Private', folderColor: '#121212' }),
    // new Note({ title: 'ToDo List 3', body: "some ToDo text", folder: 'ToDo', folderColor: '#EE3456' }),
    // new Note({ title: 'private note 22', body: "some Private text", folder: 'Private', folderColor: '#121212' }),
    // new Note({ title: 'ToDo List 2', body: "some more ToDo text", folder: 'ToDo', folderColor: '#EE3456' }),
    // new Note({ title: 'ToDo List 4', body: "some more ToDo text", folder: 'ToDo' })
  ]

  activeFolder = null
  activeNote = null


  // !SECTION GLOBAL VARIABLES

  // NOTE Used to load initial data
  init() {
    this.folders = loadState('folders', [Folder])
    this.notes = loadState('notes', [Note])
  }
}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
