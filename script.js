document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const todolistItems = document.getElementById('todolist-items');
  
    let task = JSON.parse(localStorage.getItem('task')) || [];
  
    displayTasks(task);
  
    addTaskButton.addEventListener('click', function () {
      const newTaskText = todoInput.value.trim();
      if (newTaskText === '') {
        return;
      }
  
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      };
      task.push(newTask);
      saveTask(task);
      displayTasks(task);
      todoInput.value = '';
    });
  
    function displayTasks() {
      todolistItems.innerHTML = '';
      const fragment = document.createDocumentFragment();
      task.forEach((currentTask) => {
        const li = document.createElement('li');
        li.dataset.id = currentTask.id;
        if (currentTask.completed) {
          li.classList.add('completed');
        }
        li.innerHTML = `
              <input type="checkbox" ${currentTask.completed ? 'checked' : ''}>
              <span>${currentTask.text}</span>
              <button class="delete-task">Delete</button>
          `;
        li.querySelector('input[type="checkbox"]').addEventListener(
          'change',
          () => {
            currentTask.completed = !currentTask.completed;
            saveTask();
            currentTask.completed
              ? li.classList.add('completed')
              : li.classList.remove('completed');
          }
        );
        li.querySelector('.delete-task').addEventListener('click', (e) => {
          e.stopPropagation();
          task = task.filter((t) => t.id !== currentTask.id);
          li.remove();
          saveTask();
          displayTasks();
        });
        fragment.appendChild(li);
      });
  
      todolistItems.appendChild(fragment);
    }
  
    function saveTask() {
      localStorage.setItem('task', JSON.stringify(task));
    }
  });