document.addEventListener('DOMContentLoaded', () => {
    const firstPage = document.getElementById('first-page');
    const secondPage = document.getElementById('second-page');
    const seeMessageButton = document.getElementById('see-message-button');

    // Switch from first page to second page
    seeMessageButton.addEventListener('click', () => {
        firstPage.classList.remove('active');
        secondPage.classList.add('active');
        generateFlowers();
    });

    // Show the first page on load
    firstPage.classList.add('active');
});

// Generate floating flowers
function generateFlowers() {
    const secondPage = document.getElementById('second-page');

    for (let i = 0; i < 20; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDelay = Math.random() * 5 + 's';
        flower.style.backgroundImage = "url('https://i.imgur.com/2xNq9Ui.png')"; // Flower image URL
        flower.style.backgroundSize = 'contain';
        flower.style.backgroundRepeat = 'no-repeat';
        secondPage.appendChild(flower);
    }
}
