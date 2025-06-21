document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("openButton");
    const div3 = document.querySelector(".div3");
    const todolist = document.getElementById("todoList");

    openButton.addEventListener("click", () => {

        // Ersetzt jetzigen Content
        div3.innerHTML = `
            <h3>Neues Todo einfügen</h3>
            <input type="text" id="todoInput" placeholder="titel"/>
            <button id="addTodoButton">Hinzufuegen</button>
            <button id="schliessenButton">Schliessen</button>
        `;

        // Todos Einfügen funktion
        const addTodoButton = div3.querySelector("#addTodoButton");
        const todoInput = div3.querySelector("#todoInput");

        addTodoButton.addEventListener("click", () => {
                const neuTodo = todoInput.value;

                if (neuTodo) {
                    //Todo herstellen
                    const listItem = document.createElement("li");
                    listItem.textContent = neuTodo;
                    console.log(listItem);

                    //Todo in der Liste einfügen
                    todolist.appendChild(listItem);

                    //Input ausleeren
                    todoInput.value = "";
                } else {
                    alert("Bitte nicht leer eingeben")
                }
            }
        );

        // Schliessen Button funktion
        const schliessenButton = div3.querySelector("#schliessenButton");
        schliessenButton.addEventListener("click", () => {
            div3.innerHTML = `
                <h3>Kein Element Ausgewählt</h3>
                <p>Wählen sie ein Objekt aus um dieses zu verändern</p>
            `;
        });
    });
});