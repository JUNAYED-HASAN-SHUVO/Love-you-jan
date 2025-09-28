// script.js

// This script assumes 'auth', 'db', and 'functions' are ready from firebase-init.js

// --- GLOBAL STATE ---
let currentUser = null;
let userData = {};

// --- AUTHENTICATION ---
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        db.collection('users').doc(user.uid).onSnapshot(doc => {
            if (doc.exists) {
                userData = { uid: doc.id, ...doc.data() };
                updateProfileView(); // Update the view with new data
            }
        });
    } else {
        currentUser = null;
        userData = {};
        updateProfileView(); // Update the view to the logged-out state
    }
});


// --- DYNAMIC CONTENT LOADING (Controlled by Admin) ---
document.addEventListener('DOMContentLoaded', () => {
    loadGames();
    loadDynamicModalContent();
});

function loadGames() {
    const gameSection = document.getElementById('game-section');
    db.collection('games').orderBy('order').onSnapshot(snapshot => {
        gameSection.innerHTML = '';
        snapshot.forEach(doc => {
            const game = doc.data();
            const gameCard = document.createElement('a');
            gameCard.className = 'game-card';
            if (game.gameId === 'aviator') {
                 gameCard.href = 'aviator.html';
            } else {
                 gameCard.href = `play.html?gameId=${game.gameId}`;
            }
            gameCard.innerHTML = `<img src="${game.imageUrl}" alt="${game.name}"><h3>${game.name}</h3>`;
            gameSection.appendChild(gameCard);
        });
    });
}

function loadDynamicModalContent() {
    db.collection('config').doc('deposit').onSnapshot(doc => {
        if(doc.exists) document.getElementById('depositContent').innerHTML = doc.data().htmlContent;
    });
    db.collection('config').doc('withdraw').onSnapshot(doc => {
        if(doc.exists) document.getElementById('withdrawContent').innerHTML = doc.data().htmlContent;
    });
}


// --- MODIFIED FUNCTION ---
// This function now defines a static, unchangeable structure for the user profile.
function updateProfileView() {
    const profileContent = document.getElementById('profileContent');
    if (currentUser) {
        // The HTML structure is now hardcoded here and cannot be changed by the admin.
        // Only the data (name, email, balance) is dynamic.
        profileContent.innerHTML = `
            <span class="close" onclick="closeModal('profileModal')">&times;</span>
            <h2>My Profile</h2>
            <div class="profile-info">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfherR2D_dY5ONMYcCyqx9vaeQZXlamDW08RMjF2YXjBAhICDdF_waBQ&s=10" alt="Profile Pic">
                <h3>${userData.name || 'User'}</h3>
                <p>Email: ${userData.email || ''}</p>
                <p>Balance: $${userData.balance?.toFixed(2) || '0.00'}</p>
                <button onclick="logoutUser()">Logout</button>
            </div>
        `;
    } else {
        // The logged-out view is also static.
        profileContent.innerHTML = `
            <span class="close" onclick="closeModal('profileModal')">&times;</span>
            <h2>Profile</h2>
            <button onclick="openModal('loginModal')">Login</button>
            <button onclick="openModal('registerModal')">Sign Up</button>
        `;
    }
}


// --- STATIC (UNCHANGEABLE) FUNCTIONS ---
// The functions below are part of the core app and are not controlled by the admin.

function registerUser() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;
    auth.createUserWithEmailAndPassword(email, pass)
        .then(userCredential => {
            return db.collection('users').doc(userCredential.user.uid).set({ name: name, email: email, balance: 1000 });
        })
        .then(() => closeModal('registerModal'))
        .catch(error => alert(error.message));
}

function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => closeModal('loginModal'))
        .catch(error => alert(error.message));
}

function logoutUser(){
  if (confirm("Are you sure you want to log out?")) {
    auth.signOut();
    closeModal('profileModal');
  }
}

function handleDeposit() {
    if (currentUser) openModal('depositModal');
    else {
        alert("You must be logged in to make a deposit.");
        openModal('loginModal');
    }
}

function handleWithdraw() {
    if (currentUser) openModal('withdrawModal');
    else {
        alert("You must be logged in to make a withdrawal.");
        openModal('loginModal');
    }
}

function openProfile(){
    updateProfileView();
    openModal('profileModal');
}

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function switchToSignup() { closeModal('loginModal'); openModal('registerModal'); }
function switchToLogin() { closeModal('registerModal'); openModal('loginModal'); }