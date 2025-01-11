function showProposal() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('proposalPage').style.display = 'flex';

    const flowerAnimation = document.getElementById('flowerAnimation');

    const flowerTypes = ['rose', 'daisy', 'sunflower'];

    for (let i = 0; i < 50; i++) {
        const flower = document.createElement('div');
        flower.className = `flower ${flowerTypes[Math.floor(Math.random() * flowerTypes.length)]}`;
        flower.style.left = `${Math.random() * 100}%`;
        flower.style.animationDelay = `${Math.random() * 5}s`;
        flowerAnimation.appendChild(flower);
    }
}
