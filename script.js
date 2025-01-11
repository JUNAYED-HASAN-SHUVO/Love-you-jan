function showProposal() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('proposalPage').style.display = 'flex';

    const rosesAnimation = document.getElementById('rosesAnimation');
    for (let i = 0; i < 50; i++) {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.style.left = `${Math.random() * 100}%`;
        rose.style.animationDelay = `${Math.random() * 5}s`;
        rosesAnimation.appendChild(rose);
    }
}
