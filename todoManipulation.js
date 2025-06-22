import { todoHerstellen, formAusleeren } from "./todoItemUtils.js";

// Neue todos speichern
export function todosSpeichern(div3, todolist) {
    const titel = div3.querySelector("#todoInput").value.trim();
    const istEvent = div3.querySelector("#istEvent").value;
    const beschreibung = div3.querySelector("#beschreibung").value.trim();
    const autor = div3.querySelector("#autor").value.trim();
    const kategorie = div3.querySelector("#kategorie").value;
    const wichtig = div3.querySelector("#wichtig").checked;
    const dringend = div3.querySelector("#dringend").checked;
    const startDate = div3.querySelector("#startDate").value;
    const endDate = div3.querySelector("#endDate").value;
    const percentage = div3.querySelector("#percentage").value;

    // Priorität berechnen
    let priority;
    if (wichtig && dringend) {
        priority = "Sofort erledigen"; // Wichtig und Dringend
    } else if (wichtig && !dringend) {
        priority = "Einplanen und Wohlfühlen"; // Wichtig und nicht Dringend
    } else if (!wichtig && dringend) {
        priority = "Gib es ab"; // Nicht Wichtig und Dringend
    } else {
        priority = "Weg damit"; // Nicht Wichtig und Nicht Dringend
    }

    // Validierung für Start- und Enddatum
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        alert("Das Enddatum darf nicht vor dem Startdatum liegen!");
        return;
    }

    if (titel) {
        const todoData = { titel, istEvent, beschreibung, autor, kategorie, wichtig, dringend, startDate, endDate, percentage, priority };
        const listItem = todoHerstellen(todoData, div3); // Pass div3 explicitly
        todolist.appendChild(listItem);

        formAusleeren(div3);
    } else {
        alert("Bitte nicht leer eingeben");
    }
}

// Funktion für Todos bearbeiten
export function todosBearbeiten(listItem, div3 = document.querySelector(".div3")) {
    const todoData = JSON.parse(listItem.dataset.todo);

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

    // Slider für Prozent aktualisieren
    const prozentSlider = div3.querySelector("#percentage");
    const prozentValue = div3.querySelector("#percentageValue");
    prozentSlider.addEventListener("input", (event) => {
        prozentValue.textContent = `${event.target.value}%`;
    });

    // Speichern Funktion für Änderungen
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

        // Infos aktualisieren
        listItem.dataset.todo = JSON.stringify(todoData);
        listItem.innerHTML = `
                <strong>${todoData.titel}</strong> (${todoData.istEvent})<br>
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

        // Reset
        resetDiv3();
    });
}