function showProposal() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('proposalPage').style.display = 'flex';

    createFlowers('proposalAnimation', 50); // Add flowers to the second page
}

// Create Flowers on the Page
function createFlowers(containerId, count) {
    const animationContainer = document.getElementById(containerId);
    const flowerTypes = ['rose', 'daisy', 'sunflower'];

    for (let i = 0; i < count; i++) {
        const flower = document.createElement('div');
        flower.className = `flower ${flowerTypes[Math.floor(Math.random() * flowerTypes.length)]}`;
        flower.style.left = `${Math.random() * 100}%`;
        flower.style.animationDelay = `${Math.random() * 5}s`;
        flower.style.animationDuration = `${6 + Math.random() * 5}s`;
        animationContainer.appendChild(flower);
    }
}

// Initialize Landing Page Animation
createFlowers('landingAnimation', 30); // Add flowers to the first page
