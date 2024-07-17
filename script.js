document.addEventListener('DOMContentLoaded', function() {
    // Selecting DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add click event to remove button
        removeButton.addEventListener('click', function() {
            listItem.remove();
            updateTasksArray();
        });

        // Append remove button to list item
        listItem.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(listItem);

        // Save to local storage if specified
        if (save) {
            updateTasksArray();
        }
    }

    // Function to update tasks array in local storage
    function updateTasksArray() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(taskElement) {
            tasks.push(taskElement.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Event listeners
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = ''; // Clear input field
        } else {
            alert('Please enter a task.');
        }
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = ''; // Clear input field
            } else {
                alert('Please enter a task.');
            }
        }
    });

    // Load tasks from local storage on page load
    loadTasks();
});
