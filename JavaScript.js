function showProposal() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('proposalPage').style.display = 'flex';

    createStickers('proposalAnimation', 80); // Add stickers to the second page
}

// Add Stickers Animation
function createStickers(containerId, count) {
    const container = document.getElementById(containerId);
    const stickerTypes = ['rose', 'heart', 'flower'];

    for (let i = 0; i < count; i++) {
        const sticker = document.createElement('div');
        sticker.className = `sticker ${stickerTypes[Math.floor(Math.random() * stickerTypes.length)]}`;
        sticker.style.left = `${Math.random() * 100}%`;
        sticker.style.animationDelay = `${Math.random() * 5}s`;
        sticker.style.animationDuration = `${6 + Math.random() * 5}s`;
        container.appendChild(sticker);
    }
}

// Initialize Landing Page Stickers
createStickers('landingAnimation', 50); // Add stickers to the first page
