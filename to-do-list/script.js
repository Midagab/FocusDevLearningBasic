const listContainer=document.getElementById('task-container');
const input=document.getElementById('input-box');
const form = document.getElementById('form');
const deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>';
const editIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"></path><path d="m16.5 3.5 4 4L7 21l-4 1 1-4Z"></path></svg>';

form.addEventListener('submit', function(e){
    e.preventDefault();
    addTask();
});

function addTask(){
    if(input.value===''){
        alert('Please enter a task');
        return;
    }

    else{
        let li = createTaskItem(input.value, false);
        listContainer.appendChild(li);
        input.value = '';
        saveTasks();
        updateStatus();
    }
}

listContainer.addEventListener('click', function(e){
    const deleteButton = e.target.closest('.delete-btn');
    if(deleteButton){
        deleteButton.closest('li').remove();
        saveTasks();
        updateStatus();
        return;
    }

    const editButton = e.target.closest('.edit-btn');
    if(editButton){
        const listItem = editButton.closest('li');
        const textElement = listItem.querySelector('.task-text');
        const updatedText = prompt('Edit task:', textElement.textContent);
        if(updatedText !== null && updatedText.trim() !== ''){
            textElement.textContent = updatedText.trim();
        }
        saveTasks();
        updateStatus();
    }
}, false);

listContainer.addEventListener('change', function(e){
    if(e.target.classList.contains('task-checkbox')){
        let li = e.target.parentElement;
        if(e.target.checked){
            li.classList.add('checked');
        } else {
            li.classList.remove('checked');
        }
        saveTasks();
        updateStatus();
    }
}, false);

function updateStatus(){
    const tasks=listContainer.querySelectorAll('li');
    const activeTasks=listContainer.querySelectorAll('li:not(.checked)').length;
    const completedTasks=listContainer.querySelectorAll('li.checked').length;
    
    document.querySelector('.active p').innerText='Active: ' + activeTasks;
    document.querySelector('.completed p').innerText='Completed: ' + completedTasks;
    document.querySelector('.total p').innerText='Total: ' + tasks.length;
}

function saveTasks(){
    const tasks=[];
    listContainer.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const savedTasks=JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach(task => {
        let li = createTaskItem(task.text, task.checked);
        listContainer.appendChild(li);
    });
    updateStatus();
}

function createTaskItem(taskText, checked){
    const li=document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = checked;
    li.appendChild(checkbox);
    
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;
    li.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'task-action-btn edit-btn';
    editBtn.setAttribute('aria-label', 'Edit task');
    editBtn.innerHTML = editIcon;
    li.appendChild(editBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'task-action-btn delete-btn';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.innerHTML = deleteIcon;
    li.appendChild(deleteBtn);
    
    if(checked){
        li.classList.add('checked');
    }

    return li;
}

loadTasks();