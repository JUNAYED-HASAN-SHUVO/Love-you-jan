document.addEventListener("DOMContentLoaded", () => {
    const viewMessageButton = document.getElementById("view-message-button");
    const introScreen = document.getElementById("intro-screen");
    const proposalScreen = document.getElementById("proposal-screen");
    const roseContainer = document.getElementById("rose-container");

    // Transition to the proposal screen
    viewMessageButton.addEventListener("click", () => {
        introScreen.classList.add("hidden");
        proposalScreen.classList.remove("hidden");

        // Generate falling roses
        for (let i = 0; i < 100; i++) {
            const rose = document.createElement("div");
            rose.classList.add("rose");
            rose.style.left = Math.random() * 100 + "vw";
            rose.style.animationDuration = Math.random() * 2 + 3 + "s";
            rose.style.animationDelay = Math.random() * 5 + "s";
            roseContainer.appendChild(rose);
        }
    });
});
