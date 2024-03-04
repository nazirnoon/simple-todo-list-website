document.addEventListener('DOMContentLoaded', function() {
    let tasks = [];
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const filters = document.querySelectorAll('.filter-btn');

    // Add a new task
    document.getElementById('add-task').onclick = function() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const task = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) +1 : 0,
            text: taskText,
            completed: false
        };
        tasks.push(task);
        newTaskInput.value = '';
        updateTaskList();
    };

    // Update the task list UI
    function updateTaskList(filter = 'all') {
        taskList.innerHTML = '';

        tasks
            .filter(task => {
                if (filter === 'active') return !task.completed;
                if (filter === 'completed') return task.completed;
                return true;
            })
            .forEach(task => {
                const li = document.createElement('li');
                if (task.completed) li.classList.add('completed');
                li.textContent = task.text;

                // Task event listener to toggle completion status
                li.onclick = function() {
                    task.completed = !task.completed;
                    updateTaskList();
                };

                // Add delete button to each task
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = function(e) {
                    e.stopPropagation();
                    tasks = tasks.filter(t => t.id !== task.id);
                    updateTaskList();
                };

                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
    }

    // Event listeners for filters
    filters.forEach(filterBtn => {
        filterBtn.addEventListener('click', function() {
            // Remove 'active' class from all filter buttons
            filters.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the current filter button
            this.classList.add('active');
            // Update the task list based on the selected filter
            updateTaskList(this.dataset.filter);
        });
    });
});