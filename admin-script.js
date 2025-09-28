// admin-script.js (Final Version with Full Debugging)

document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT REFERENCES ---
    const loginContainer = document.getElementById('login-container');
    const adminPanel = document.getElementById('admin-panel');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginError = document.getElementById('login-error');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    // --- AUTHENTICATION GATEKEEPER ---
    auth.onAuthStateChanged(user => {
        if (user) {
            loginBtn.textContent = "Verifying Admin...";
            user.getIdTokenResult(true).then(idTokenResult => {
                if (!!idTokenResult.claims.admin) {
                    loginContainer.classList.add('hidden');
                    adminPanel.classList.remove('hidden');
                    loadDataForSection('dashboard-section');
                    document.querySelector('.nav-link.active').classList.remove('active');
                    document.querySelector('.nav-link[data-section="dashboard-section"]').classList.add('active');
                } else {
                    loginError.textContent = "Access Denied. This account is not an admin.";
                    loginError.style.display = 'block';
                    auth.signOut();
                }
            }).catch(error => {
                loginError.textContent = "Could not verify admin status. Try again.";
                loginError.style.display = 'block';
                auth.signOut();
            });
        } else {
            loginContainer.classList.remove('hidden');
            adminPanel.classList.add('hidden');
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        }
    });

    // --- LOGIN BUTTON ---
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;
        loginError.style.display = 'none';
        if (!email || !pass) {
            loginError.textContent = "Please enter both email and password.";
            loginError.style.display = 'block';
            return;
        }
        loginBtn.disabled = true;
        loginBtn.textContent = "Logging In...";
        auth.signInWithEmailAndPassword(email, pass).catch(error => {
            loginError.textContent = "Invalid email or password.";
            loginError.style.display = 'block';
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        });
    });

    // --- LOGOUT BUTTON ---
    logoutBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to log out?")) {
            auth.signOut();
        }
    });
    
    // --- NAVIGATION ---
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('data-section');
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            contentSections.forEach(section => {
                section.id === sectionId ? section.classList.remove('hidden') : section.classList.add('hidden');
            });
            loadDataForSection(sectionId);
        });
    });

    // --- DATA ROUTER ---
    function loadDataForSection(sectionId) {
        const container = document.getElementById(sectionId);
        container.innerHTML = '<h1>Loading...</h1>';
        switch (sectionId) {
            case 'dashboard-section':
                loadDashboardStats();
                break;
            // You can add more cases here for other sections as you build them
        }
    }

    // --- UI GENERATION FUNCTIONS ---
    async function loadDashboardStats() {
        const container = document.getElementById('dashboard-section');
        try {
            const userCountPromise = db.collection('users').get().then(s => s.size);
            // ... add more promises for other stats

            const [userCount] = await Promise.all([userCountPromise]);

            container.innerHTML = `
                <h1>Dashboard</h1>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="icon" style="background-color: rgba(79, 209, 197, 0.2); color: #4FD1C5;">
                            <svg fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                        </div>
                        <div>
                            <div class="value">${userCount}</div>
                            <div class="label">Total Users</div>
                        </div>
                    </div>
                    <!-- Add more stat cards here as you track more data -->
                </div>
            `;
        } catch (error) {
            container.innerHTML = '<h1>Error loading dashboard data.</h1>';
            console.error("Dashboard Error: ", error);
        }
    }
});