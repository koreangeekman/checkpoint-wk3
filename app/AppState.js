import { Folder } from "./models/Folder.js"
import { Note } from "./models/Note.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/IsValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  // SECTION GLOBAL VARIABLES

  folders = [
    new Folder({ name: 'General', color: '#123456' }),
    new Folder({ name: 'ToDo', color: '#EE3456' }),
    new Folder({ name: 'Private', color: '#121212' })
  ]

  notes = [
    new Note({ title: 'test1', body: "some general text" }),
    new Note({ title: 'test2', body: "some Private text", folder: 'Private' }),
    new Note({ title: 'test3', body: "some ToDo text", folder: 'ToDo' })
  ]

  activeFolder = null
  activeNote = null


  // !SECTION GLOBAL VARIABLES

  // NOTE Used to load initial data
  init() {
    // notes = loadState('notes', [Note])

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
