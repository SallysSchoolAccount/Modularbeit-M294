import { todoHerstellen, formAusleeren } from "./todoItemUtils.js";
import { resetDiv3 } from "./formManipulation.js";

// Initialize todos array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos to localStorage
function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage and render them on page load
export function loadTodos(todolist) {
    todolist.innerHTML = ""; // Clear existing list items
    todos.forEach((todo, index) => {
        const listItem = todoHerstellen(todo, index); // Properly pass index to todoHerstellen
        todolist.appendChild(listItem);
    });
}

// Save new todo
export function todosSpeichern(div3, todolist) {
    const titel = div3.querySelector("#todoInput").value.trim();
    const istEvent = div3.querySelector("#istEvent").value;
    const beschreibung = div3.querySelector("#beschreibung").value.trim();
    const autor = div3.querySelector("#autor").value.trim();
    const kategorie = div3.querySelector("#kategorie").value;
    const startDate = div3.querySelector("#startDate").value;
    const endDate = div3.querySelector("#endDate").value;

    if (!titel) {
        alert("Bitte geben Sie den Titel ein."); // More specific alert for `titel`
        return;
    }
    if (!beschreibung) {
        alert("Bitte geben Sie eine Beschreibung ein."); // Specific alert for `beschreibung`
        return;
    }
    if (!autor) {
        alert("Bitte geben Sie einen Autor an."); // Specific alert for `autor`
        return;
    }
    if (!startDate || !endDate) {
        alert("Bitte geben Sie ein Start- und Enddatum ein."); // Specific alert for dates
        return;
    }

    const wichtig = div3.querySelector("#wichtig").checked;
    const dringend = div3.querySelector("#dringend").checked;
    const percentage = div3.querySelector("#percentage").value;

    let priority;
    if (wichtig && dringend) {
        priority = "Sofort erledigen"; // Important and Urgent
    } else if (wichtig && !dringend) {
        priority = "Einplanen und Wohlfühlen"; // Important but not Urgent
    } else if (!wichtig && dringend) {
        priority = "Gib es ab"; // Urgent but not Important
    } else {
        priority = "Weg damit"; // Neither Important nor Urgent
    }

    // At this point, all validations have passed.
    const todoData = { 
        titel, 
        istEvent, 
        beschreibung, 
        autor, 
        kategorie, 
        startDate, 
        endDate, 
        wichtig, 
        dringend, 
        percentage, 
        priority 
    };

    todos.push(todoData); // Add the todos to the array
    saveTodosToLocalStorage(); // Save the updated array to localStorage

    const listItem = todoHerstellen(todoData, todos.length - 1); // Create list item
    todolist.appendChild(listItem); // Add the new todo to the list

    formAusleeren(div3); // Clear the form inputs
}

export function todosBearbeiten(listItem, div3 = document.querySelector(".div3")) {
    const index = parseInt(listItem.dataset.index, 10);
    const todoData = todos[index];

    // Öffnet Bearbeitungsmodus und befüllt die Felder
    div3.innerHTML = `
        <h3>Todo bearbeiten</h3>

        <form>
            <label for="todoInput">Titel (Max: 255)</label>
            <input type="text" id="todoInput" maxlength="255" value="${todoData.titel}"><br><br>
                
            <label for="istEvent">Event oder Task?</label>
            <select id="istEvent">
                <option value="Event" ${todoData.istEvent === "Event" ? "selected" : ""}>Event</option>
                <option value="Task" ${todoData.istEvent === "Task" ? "selected" : ""}>Task</option>
            </select><br><br>
                
            <label for="beschreibung">Beschreibung</label><br>
            <textarea id="beschreibung" rows="4" cols="30">${todoData.beschreibung}</textarea><br><br>
                
            <label for="autor">Autor (Max: 20)</label>
            <input type="text" id="autor" maxlength="20" value="${todoData.autor}"><br><br>
                
            <label for="kategorie">Kategorie</label>
            <select id="kategorie">
                <option value="Familie" ${todoData.kategorie === "Familie" ? "selected" : ""}>Familie</option>
                <option value="Reisen" ${todoData.kategorie === "Reisen" ? "selected" : ""}>Reisen</option>
                <option value="Arbeit" ${todoData.kategorie === "Arbeit" ? "selected" : ""}>Arbeit</option>
                <option value="Ausgang" ${todoData.kategorie === "Ausgang" ? "selected" : ""}>Hobby</option>
            </select><br><br>
                
            <label for="startDate">Startdatum</label>
            <input type="date" id="startDate" value="${todoData.startDate}"><br><br>
                
            <label for="endDate">Enddatum</label>
            <input type="date" id="endDate" value="${todoData.endDate}"><br><br>

            <label for="percentage">Prozentsatz der durchgeführten TODO (0-100%)</label>
            <input type="range" id="percentage" min="0" max="100" value="${todoData.percentage}">
            <span id="percentageValue">${todoData.percentage}%</span><br><br>
                
            <button id="updateTodo">Speichern</button>
        </form>
            
        <button id="schliessenButton">Schliessen</button>
    `;

    // Update percentage slider
    const prozentSlider = div3.querySelector("#percentage");
    const prozentValue = div3.querySelector("#percentageValue");
    prozentSlider.addEventListener("input", (event) => {
        prozentValue.textContent = `${event.target.value}%`;
    });

    // Save edited data
    div3.querySelector("#updateTodo").addEventListener("click", (event) => {
        event.preventDefault();

        // Update the data based on modified form values
        todoData.titel = div3.querySelector("#todoInput").value.trim();
        todoData.istEvent = div3.querySelector("#istEvent").value;
        todoData.beschreibung = div3.querySelector("#beschreibung").value.trim();
        todoData.autor = div3.querySelector("#autor").value.trim();
        todoData.kategorie = div3.querySelector("#kategorie").value;
        todoData.startDate = div3.querySelector("#startDate").value;
        todoData.endDate = div3.querySelector("#endDate").value;
        todoData.percentage = div3.querySelector("#percentage").value;

        // Update todos array and save changes
        todos[index] = todoData;
        saveTodosToLocalStorage();

        // Update list item content
        listItem.dataset.todo = JSON.stringify(todoData);
        listItem.innerHTML = `
            <strong>${todoData.titel}</strong> (${todoData.istEvent})
            <button class="edit-icon" title="Click to edit">✏️</button>
            <button class="delete-button" title="Delete this todo">🗑️</button><br>
            <strong>Priorität:</strong> ${todoData.priority}<br>
            <em>Beschreibung:</em> ${todoData.beschreibung}<br>
            <em>Autor:</em> ${todoData.autor}<br>
            <em>Kategorie:</em> ${todoData.kategorie}<br>
            <em>Wichtig:</em> ${todoData.wichtig ? "Ja" : "Nein"}, 
            <em>Dringend:</em> ${todoData.dringend ? "Ja" : "Nein"}<br>
            <em>Startdatum:</em> ${todoData.startDate || "Nicht angegeben"}<br>
            <em>Enddatum:</em> ${todoData.endDate || "Nicht angegeben"}<br>
            <em>Prozentsatz:</em>
            <progress value="${todoData.percentage}" max="100"></progress> ${todoData.percentage}%<br>
        `;

        // Reattach event listeners for the new "edit" and "delete" buttons
        listItem.querySelector(".edit-icon").addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent propagation if the item itself is clickable
            todosBearbeiten(listItem); // Rebind edit functionality
        });

        listItem.querySelector(".delete-button").addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent propagation
            deleteTodoItem(listItem); // Rebind delete functionality
        });

        // Reset div3
        resetDiv3();
    });
}

export function deleteTodoItem(todoItem) {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if (isConfirmed) {
        const index = parseInt(todoItem.dataset.index, 10); // Get index from dataset
        todos.splice(index, 1); // Remove from todos array
        saveTodosToLocalStorage(); // Save updated todos array to localStorage
        todoItem.remove(); // Remove the item from the DOM

        // Reassign dataset.index for all remaining todos after deletion
        const todoListItems = document.querySelectorAll("#todoList > li");
        todoListItems.forEach((item, newIndex) => {
            item.dataset.index = newIndex.toString(); // Update the index in dataset
        });
    }
}