import { renderAddTodoForm, resetDiv3 } from "./formManipulation.js";
import { todosSpeichern, loadTodos } from "./todoManipulation.js";
import { todoHerstellen } from "./todoItemUtils.js";

document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("openButton");
    const div3 = document.querySelector(".div3");
    const todoList = document.getElementById("todoList");
    const searchInput = document.getElementById("searchInput");

    // Load existing todos from localStorage and render them
    loadTodos(todoList);

    openButton.addEventListener("click", () => {
        renderAddTodoForm(div3);

        // Close button functionality
        const closeButton = div3.querySelector("#schliessenButton");
        closeButton.addEventListener("click", () => {
            resetDiv3(div3);
        });

        // Save new todos when Add Todo button is clicked
        const addTodoButton = div3.querySelector("#addTodoButton");
        addTodoButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent page refresh
            todosSpeichern(div3, todoList); // Save new todo and update UI
        });
    });

    // Add a search input event listener
    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        searchTodos(query, todoList);
    });

    todoList.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});

// Function to search todos by title and update the UI
import { filterTodosByTitle } from "./todoManipulation.js";

function searchTodos(query, todoList) {
    const filteredTodos = filterTodosByTitle(query);
    todoList.innerHTML = ""; // Clear the current list
    filteredTodos.forEach((todo, index) => {
        const listItem = todoHerstellen(todo, index);
        todoList.appendChild(listItem); // Add filtered todos to the list
    });
}