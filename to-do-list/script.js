const listContainer=document.getElementById('task-container');
const input=document.getElementById('input-box');
const form = document.getElementById('form');

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
        let li=document.createElement('li');
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        li.appendChild(checkbox);
        
        let span = document.createElement('span');
        span.className = 'task-text';
        span.innerText = input.value;
        li.appendChild(span);
        
        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);
        
        listContainer.appendChild(li);
        input.value = '';
        saveTasks();
        updateStatus();
    }
}

listContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('delete-btn')){
        e.target.parentElement.remove();
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
        let li=document.createElement('li');
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.checked;
        li.appendChild(checkbox);
        
        let span = document.createElement('span');
        span.className = 'task-text';
        span.innerText = task.text;
        li.appendChild(span);
        
        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);
        
        if(task.checked){
            li.classList.add('checked');
        }
        
        listContainer.appendChild(li);
    });
    updateStatus();
}

loadTasks();
