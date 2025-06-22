document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("openButton");
    const div3 = document.querySelector(".div3");
    const todolist = document.getElementById("todoList");

    openButton.addEventListener("click", () => {

        // Ersetzt jetzigen Content
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

        //Slider für prozent
        const prozentSlider = div3.querySelector("#percentage");
        const prozentValue = div3.querySelector("#percentageValue");
        prozentSlider.addEventListener("input", () => {
            prozentValue.textContent = `${event.target.value}%`;
        })

        // Todos Einfügen Funktion
        const addTodoButton = div3.querySelector("#addTodoButton");
        const todoInput = div3.querySelector("#todoInput");

        addTodoButton.addEventListener("click", (event) => {
            event.preventDefault(); // Verhindert das Standard-Submit-Verhalten

            const titel = todoInput.value.trim();
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
            let priority = "";
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
                // Todos herstellen
                const listItem = document.createElement("li");

                // Detaillierte Anzeige
                listItem.innerHTML = `
                    <strong>${titel}</strong> (${istEvent})<br>
                    <strong>Priorität:</strong> ${priority}<br>
                    <em>Beschreibung:</em> ${beschreibung}<br>
                    <em>Autor:</em> ${autor}<br>
                    <em>Kategorie:</em> ${kategorie}<br>
                    <em>Wichtig:</em> ${wichtig ? "Ja" : "Nein"}, 
                    <em>Dringend:</em> ${dringend ? "Ja" : "Nein"}<br>
                    <em>Startdatum:</em> ${startDate || "Nicht angegeben"}<br>
                    <em>Enddatum:</em> ${endDate || "Nicht angegeben"}<br>
                    <em>Prozentsatz:</em> 
                    <progress value="${percentage}" max="100"></progress> ${percentage}%<br>
                    <br>     
                `;

                // Todos in der Liste einfügen
                todolist.appendChild(listItem);

                // Input ausleeren
                todoInput.value = "";
                div3.querySelector("#beschreibung").value = "";
                div3.querySelector("#autor").value = "";
                div3.querySelector("#wichtig").checked = false;
                div3.querySelector("#dringend").checked = false;
                div3.querySelector("#istEvent").value = "Event";
                div3.querySelector("#kategory").value = "Sport";
                div3.querySelector("#startDate").value = "";
                div3.querySelector("#endDate").value = "";
                div3.querySelector("#percentage").value = 0;
                prozentValue.textContent = "0%";
            } else {
                // Warnung anzeigen, wenn Titel fehlt
                alert("Bitte nicht leer eingeben");
            }
        });

        // Schliessen Button Funktion
        const schliessenButton = div3.querySelector("#schliessenButton");
        schliessenButton.addEventListener("click", () => {
            div3.innerHTML = `
                <h3>Kein Element Ausgewählt</h3>
                <p>Wählen sie ein Objekt aus um dieses zu verändern</p>
            `;
        });
    });
});