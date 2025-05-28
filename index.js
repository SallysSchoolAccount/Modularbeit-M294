document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("openButton");
    const div3 = document.querySelector(".div3");

    openButton.addEventListener("click", () => {
        
        // Ersetzt jetzigen Content
        div3.innerHTML = `
            <h3>New Content</h3>
            <p>This content has been dynamically updated!</p>
            <button id="schliessenButton">Schliessen</button>
        `;

        // Add an event listener to the reset button
        const schliessenButton = div3.querySelector("#schliessenButton");
        schliessenButton.addEventListener("click", () => {
            div3.innerHTML = `
                <h3>Kein Element Ausgewählt</h3>
                <p>Wählen sie ein Objekt aus um dieses zu verändern</p>
            `;
        });
    });
});