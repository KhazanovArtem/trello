export default class Trells {
    constructor() {

    }

    builtToDOM() {
        const body = document.querySelector('body');
        const container = document.createElement('main');
        container.classList.add('container');
        body.appendChild(container);
        let i = 0;
        while(i < 3) {
            const item = document.createElement('section');
            item.classList.add('item');
            const title = document.createElement('span');
            title.classList.add('item-title');
            const tasklist = document.createElement('ul');
            tasklist.classList.add('task-list');
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = '+ Add Card';
            item.appendChild(title);
            item.appendChild(tasklist);
            item.appendChild(button);
            container.appendChild(item);
            i++;
        }

        const items = document.querySelectorAll('.item');
        const columnToDO = items[0];
        const columnInProgress = items[1];
        const columnDone = items[2];

        columnToDO.classList.add('to-do');
        const titleToDo = columnToDO.querySelector('.item-title');
        titleToDo.textContent = 'to do';

        columnInProgress.classList.add('in-progress');
        const titleInProgress = columnInProgress.querySelector('.item-title');
        titleInProgress.textContent = 'in progress';

        columnDone.classList.add('done');
        const titleDone = columnDone.querySelector('.item-title');
        titleDone.textContent = 'done';


    }
}