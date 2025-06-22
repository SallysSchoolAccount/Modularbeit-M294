import { todosSpeichern } from "./todoManipulation.js";

export function renderAddTodoForm(div3 = document.querySelector(".div3")) {
    div3.innerHTML = `
            <h3>Neues Todo einfügen</h3>
            <form>
                <label for="todoInput">Titel (Max: 255)</label>
                <input type="text" id="todoInput" maxlength="255"><br><br>
                
                <label for="istEvent">Event oder Task?</label>
                <select id="istEvent">
                    <option value="Event">Event</option>
                    <option value="Task">Task</option>
                </select><br><br>
                
                <label for="beschreibung">Beschreibung</label><br>
                <textarea id="beschreibung" rows="4" cols="30"></textarea><br><br>
                
                <label for="autor">Autor (Max: 20)</label>
                <input type="text" id="autor" maxlength="20"><br><br>
                
                <label for="kategorie">Kategorie</label>
                <select id="kategorie">
                    <option value="Familie">Familie</option>
                    <option value="Reisen">Reisen</option>    
                    <option value="Arbeit">Arbeit</option>
                    <option value="Ausgang">Hobby</option>
                </select><br><br>
                
                <label for="wichtig">Wichtig</label>
                <input type="checkbox" id="wichtig"><br>
                
                <label for="dringend">Dringend</label>
                <input type="checkbox" id="dringend"><br><br>
                
                <label for="startDate">Startdatum</label>
                <input type="date" id="startDate"><br><br>
                
                <label for="endDate">Enddatum</label>
                <input type="date" id="endDate"><br><br>

                <label for="percentage">Prozentsatz der durchgeführten TODO (0-100%)</label>
                <input type="range" id="percentage" min="0" max="100" value="0">
                <span id="percentageValue">0%</span><br><br>
                
                <button id="addTodoButton">Hinzufuegen</button>
            </form>
            
            <button id="schliessenButton">Schliessen</button>
        `;

    const prozentSlider = div3.querySelector("#percentage");
    const prozentValue = div3.querySelector("#percentageValue");
    prozentSlider.addEventListener("input", (event) => {
        prozentValue.textContent = `${event.target.value}%`;
    });

    // Select the todos list so it can be passed to todosSpeichern
    const todolist = document.querySelector("#todoList");

    // Fixed Todos Save Function
    const addTodoButton = div3.querySelector("#addTodoButton");
    addTodoButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default submit behavior
        todosSpeichern(div3, todolist); // Pass div3 and todolist
    });
}

export function resetDiv3(div3 = document.querySelector(".div3")) {
    div3.innerHTML = `
            <h3>Kein Element Ausgewählt</h3>
            <p>Wählen sie ein Objekt aus um dieses zu verändern</p>
        `;
}