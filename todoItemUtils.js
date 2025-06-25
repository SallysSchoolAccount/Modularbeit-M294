import {deleteTodoItem, todosBearbeiten} from "./todoManipulation.js";

export function todoHerstellen(todoData, index) {
    const listItem = document.createElement("li");

    // Speichert die aktuellen Daten in `index`
    listItem.dataset.todo = JSON.stringify(todoData);
    listItem.dataset.index = index; // Keep index track for editing and deletion

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
        <br>
    `;
    listItem.classList.add("list-item");

    // Klick-Handler für Bearbeiten
    listItem.querySelector(".edit-icon").addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent propagation
        todosBearbeiten(listItem);
    });

    // Klick-Handler für Löschen
    listItem.querySelector(".delete-button").addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent propagation
        deleteTodoItem(listItem);
    });

    return listItem;
}

export function formAusleeren(div3) {
    div3.querySelector("#todoInput").value = "";
    div3.querySelector("#beschreibung").value = "";
    div3.querySelector("#autor").value = "";
    div3.querySelector("#wichtig").checked = false;
    div3.querySelector("#dringend").checked = false;
    div3.querySelector("#istEvent").value = "Event";
    div3.querySelector("#kategorie").value = "Familie";
    div3.querySelector("#startDate").value = "";
    div3.querySelector("#endDate").value = "";
    div3.querySelector("#percentage").value = 0;
    div3.querySelector("#percentageValue").textContent = "0%";
}
