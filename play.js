// play.js

// Firebase config and initialization moved to firebase-init.js
// This script uses the global 'db' and 'storage' variables.

// --- GAME LOADING LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');

    if (!gameId) {
        document.getElementById('loader').textContent = 'Error: No game ID provided.';
        return;
    }

    loadGameFromFirebase(gameId);
});

// The loadGameFromFirebase function remains exactly the same. It will use the
// global 'db' and 'storage' objects initialized by firebase-init.js
// ...