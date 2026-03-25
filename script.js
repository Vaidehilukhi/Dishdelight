// Shared Logic

document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
});

function injectNavbar() {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        localStorage.removeItem('user');
    }
    console.log('Current user:', user); // Debugging

    let authLinks = '';

    if (user) {
        authLinks = `
            <span style="color: white; margin-right: 1rem;">Welcome, ${user.name}</span>
            <a href="#" id="logout-btn" class="btn btn-outline">Logout</a>
        `;

        // Update Get Started button if it exists
        const getStartedBtn = document.getElementById('get-started-btn');
        if (getStartedBtn) {
            getStartedBtn.textContent = 'View Recipes';
            getStartedBtn.href = '/recipe-list.html';
        }
    } else {
        authLinks = `
            <a href="/signin.html" class="btn btn-outline">Sign In</a>
            <a href="/signup.html" class="btn btn-primary">Sign Up</a>
        `;
    }

    let navLinks = `
        <li><a href="/">Home</a></li>
        <li><a href="/most-popular.html">Most Popular</a></li>
    `;

    if (user) {
        navLinks += `
            <li><a href="/recipe-list.html">Recipes</a></li>
            <li><a href="/add-recipe.html">Add Recipe</a></li>
        `;
    }

    navLinks += `
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="/about-us.html">About Us</a></li>
    `;

    const navbarHTML = `
    <nav class="navbar">
        <div class="logo">DISHDELIGHT</div>
        <ul class="nav-links">
            ${navLinks}
        </ul>
        <div class="auth-buttons">
            ${authLinks}
        </div>
    </nav>
    `;

    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHTML;
    } else {
        const navContainer = document.createElement('header');
        navContainer.innerHTML = navbarHTML;
        document.body.prepend(navContainer);
    }

    if (user) {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = '/signin.html';
            });
        }
    }
}

async function apiFetch(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        alert('Something went wrong. Please try again.');
    }
}
