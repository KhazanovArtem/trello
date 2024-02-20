import Trells from "./Trells";
import Controller from "./Controller";

if (localStorage.getItem('data')) {
    const load = JSON.parse(localStorage.getItem('data'));
    const body = document.querySelector('body');
    body.innerHTML = load.cont;

    let controller = new Controller();
    controller.registerAddButtons();
    controller.registerDragEvents();
    controller.registerTasksEvents();
} else {
    let trells = new Trells();
    trells.builtToDOM();
    
    let controller = new Controller();
    controller.registerAddButtons();
    controller.registerDragEvents();
    controller.registerTasksEvents();
}
