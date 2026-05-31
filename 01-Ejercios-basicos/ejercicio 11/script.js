
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (input.value.trim() === "") {
        errorMessage.textContent = "Por favor, escribe una tarea.";
        errorMessage.style.display = "block";
        return;
    }

    errorMessage.style.display = "none";

    const newLI = document.createElement('li');


    const taskSpan = document.createElement('span');
    taskSpan.textContent = input.value;
    newLI.appendChild(taskSpan);

    const btnComplete = document.createElement('button');
    btnComplete.textContent = "Completar";
    btnComplete.onclick = function () {
        taskSpan.classList.toggle('completada');
    };
    newLI.appendChild(btnComplete);


    const btnDelete = document.createElement('button');
    btnDelete.textContent = "Eliminar";
    btnDelete.onclick = function () {
        newLI.remove();
    };
    newLI.appendChild(btnDelete);

    taskList.appendChild(newLI);
    input.value = "";
});
