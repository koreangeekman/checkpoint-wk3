import { AboutController } from "./controllers/AboutController.js";
import { NotesController } from "./controllers/NotesController.js";
import { AboutView } from "./views/AboutView.js";
import { NotesView } from "./views/NotesView.js";


export const router = [
  {
    path: '',
    controller: null,
    view: null
    // view: /*html*/`
    // <div class="card">
    //   <div class="card-body">
    //     <p>Home Page</p>
    //     <button class="btn btn-dark">😎</button>
    //   </div>
    // </div>
    // `
  },
  {
    path: '#/notes',
    controller: NotesController,
    view: null
  },
  {
    path: '#/about',
    controller: AboutController,
    view: AboutView
  }
]