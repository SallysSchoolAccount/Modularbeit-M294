import { renderAddTodoForm, resetDiv3 } from "./formManipulation.js";
import { todosSpeichern, deleteTodoItem } from "./todoManipulation.js";

document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("openButton");
    const div3 = document.querySelector(".div3");
    const todolist = document.getElementById("todoList");

    openButton.addEventListener("click", () => {
        renderAddTodoForm(div3);

        // Schliessen Button Funktion
        const schliessenButton = div3.querySelector("#schliessenButton");
        schliessenButton.addEventListener("click", () => {
            resetDiv3(div3);
        });

        // Add Todos button functionality
        const addTodoButton = div3.querySelector("#addTodoButton");
        addTodoButton.addEventListener("click", (event) => {
            event.preventDefault(); // Kein Refresh
            todosSpeichern(div3, todolist);

            // Add delete functionality to newly added todos
            todolist.querySelectorAll(".todo-item").forEach((item) => {
                const deleteButton = item.querySelector(".delete-button");
                if (deleteButton) {
                    deleteButton.addEventListener("click", () => deleteTodoItem(item));
                }
            });
        });
    });
});