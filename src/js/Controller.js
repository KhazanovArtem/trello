import { getClass } from "./utils";

export default class Controller {
    constructor() {
        this.buttonsAdd = Array.from(document.querySelectorAll('.button'));
        this.taskLists = Array.from(document.querySelectorAll('.task-list'));
        this.tasks = Array.from(document.querySelectorAll('.task'));
        this.onBtnAddClick = this.onBtnAddClick.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.closeCard = this.closeCard.bind(this);
    }

    registerAddButtons() {
        for (let i in this.buttonsAdd) {
            this.buttonsAdd[i].addEventListener('click', (event) => {
                this.closeCard();
                this.buttonAdd = event.currentTarget;
                this.onBtnAddClick(this.buttonAdd);
            });
        }
    }

    registerTasksEvents () {
      this.tasks.forEach(item => {
        let closetask = item.querySelector('.close-task-button');
        closetask.style.opacity = 0;
        item.addEventListener('mouseover', () => {
          closetask.style.opacity = 1;
        })
        item.addEventListener('mouseleave', () => {
          closetask.style.opacity = 0;
        })
        closetask.addEventListener('click', () => {
          closetask.parentElement.remove();
        })
      })
    }
    
    registerDragEvents() {
        let dragTask;
        let invisTask;
        let shiftX;
        let shiftY;

        const onMouseDown = (e) => {
            if (!e.target.classList.contains('task')) {
                return;
            }
            e.preventDefault();
            const board = document.querySelector('.container');
            invisTask = e.target;
            dragTask = e.target.cloneNode(true);
            document.querySelector('body').appendChild(dragTask);
            invisTask.classList.add('invisible');
            dragTask.classList.add('dragged');
            dragTask.style.height = `${invisTask.clientHeight}px`;
            dragTask.style.width = `${invisTask.clientWidth}px`;
            
            shiftX = e.clientX - invisTask.getBoundingClientRect().left + board.getBoundingClientRect().left;
            shiftY = e.clientY - invisTask.getBoundingClientRect().top + board.getBoundingClientRect().top;
            
            dragTask.style.left = `${e.pageX - shiftX}px`;
            dragTask.style.top = `${e.pageY - shiftY}px`;
            document.addEventListener('mouseover', onMouseOver);
            
          }
          
          const onMouseMove = (e) => {
            if (!dragTask) {
              return;
            }
          dragTask.style.left = `${e.pageX - shiftX}px`;
          dragTask.style.top = `${e.pageY - shiftY}px`;
        }

        const onMouseOver = (e) => {
          const closest = document.elementFromPoint(e.clientX, e.clientY);

          const column = e.target.parentElement;
            if (e.target.classList.contains('task')) {
              if (e.target == column.lastChild) {
                column.appendChild(invisTask);
              } else {
                column.insertBefore(invisTask, e.target);
              }
            }

            if (closest.classList.contains('task-list')) {
              const task = closest.querySelector('.task');
              if (task == null) {
                closest.appendChild(invisTask);
              }
            }
          }
          
          const onMouseUp = () => {
            if (!dragTask) {
              return;
            }
            invisTask.classList.remove('invisible');
            dragTask.remove();
            document.removeEventListener('mouseover', onMouseOver);
            // this.saveState();

        }

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    registerNewCardButtons() {
        this.closeButton.addEventListener('click', this.closeCard);
        this.newCardButton.addEventListener('click', this.addNewCard);
    }

    onBtnAddClick(button) {
        button.style.display = 'none';
        const targetSection = button.parentElement;
        const newCard = document.createElement('div');
        newCard.classList.add('new-card');
        const input = document.createElement('textarea');
        input.classList.add('new-card-input');
        input.placeholder = 'Please describe the task...'
        const footerbtn = document.createElement('div');
        footerbtn.classList.add('footer-button');
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.textContent = "\u00D7";
        this.closeButton = closeButton;
        const newButtonAdd = document.createElement('button');
        newButtonAdd.classList.add('new-button-add');
        newButtonAdd.textContent = '+ Add Card';
        this.newCardButton = newButtonAdd;
        newCard.appendChild(input);
        newCard.appendChild(footerbtn);
        footerbtn.appendChild(newButtonAdd);
        footerbtn.appendChild(closeButton);
        targetSection.appendChild(newCard);
        this.currentColumn = getClass();
        this.registerNewCardButtons();
    }

    addNewCard() {
        const currentItem = document.querySelector(`.${this.currentColumn}`);
        const tasklist = currentItem.querySelector('.task-list');
        const texttitle = document.querySelector('.new-card-input');
        const task = document.createElement('il');
        task.classList.add('task');
        task.textContent = texttitle.value;
        this.currentTask = task;
        const closetask = document.createElement('button');
        closetask.classList.add('close-task-button');
        closetask.textContent = "\u00D7";
        closetask.addEventListener('click', () => {
          closetask.parentElement.remove();
        })
        task.addEventListener('mouseover', () => {
          closetask.style.opacity = 1;
        })
        task.addEventListener('mouseleave', () => {
          closetask.style.opacity = 0;
        })
        task.appendChild(closetask);
        tasklist.appendChild(task);
        this.closeCard();
        this.saveState();
    }

    closeCard() {
        const card = document.querySelector('.new-card');
        if (card) {
            card.remove();
            this.buttonAdd.style.display = 'block';
        }
    }

    saveState() {
      localStorage.removeItem('data');

      const container = document.querySelector('body');
      const data = {
        cont: container.innerHTML
      }
      localStorage.setItem('data', JSON.stringify(data));
    }
}