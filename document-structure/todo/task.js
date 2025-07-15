const taskInput = document.querySelector('.tasks__input');
const tasksList = document.querySelector('.tasks__list');
const addButton = document.querySelector('.tasks__add');

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim() !== '') {
        addTask(taskInput.value.trim());
        taskInput.value = '';
    }
});

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (taskInput.value.trim() !== '') {
        addTask(taskInput.value.trim());
        taskInput.value = '';
    }
});

function addTask(text) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task__title');
    taskTitle.textContent = text;
    
    const removeLink = document.createElement('a');
    removeLink.href = '#';
    removeLink.classList.add('task__remove');
    removeLink.textContent = '×';
    
    removeLink.addEventListener('click', (e) => {
        e.preventDefault();
        taskDiv.remove();
    });
    
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(removeLink);
    tasksList.appendChild(taskDiv);
}