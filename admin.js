// Check if user is admin
const user = JSON.parse(localStorage.getItem('user'));
if (!user || user.role !== 'admin') {
    alert('Access denied. Admins only.');
    window.location.href = 'index.html';
}

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Tab switching logic
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');

        loadTabContent(tab.dataset.tab);
    });
});

// Load content based on tab
async function loadTabContent(tabName) {
    switch (tabName) {
        case 'users':
            loadUsers();
            break;
        case 'recipes':
            loadRecipes();
            break;
        case 'reviews':
            loadReviews();
            break;
        case 'contact':
            loadMessages();
            break;
    }
}

// Initial load
loadUsers();

async function loadUsers() {
    try {
        const response = await fetch('/api/admin/users', {
            headers: { 'role': user.role }
        });
        const users = await response.json();

        const tbody = document.querySelector('#users-table tbody');
        tbody.innerHTML = '';

        users.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role || 'user'}</td>
                <td>
                    <button class="btn-danger btn-sm" onclick="deleteUser(${u.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: { 'role': user.role }
        });
        if (response.ok) {
            loadUsers();
        } else {
            alert('Error deleting user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadRecipes() {
    try {
        const response = await fetch('/api/recipes');
        const recipes = await response.json();

        const container = document.getElementById('recipes-list');
        container.innerHTML = '';

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${recipe.image || 'https://via.placeholder.com/300'}" alt="${recipe.title}">
                <div class="card-content">
                    <h3 class="card-title">${recipe.title}</h3>
                    <p class="card-text">${recipe.description.substring(0, 100)}...</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        
                        <button class="btn-danger btn-sm" onclick="deleteRecipe(${recipe.id})">Delete</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

async function deleteRecipe(id) {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    try {
        const response = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'role': user.role
            },
            body: JSON.stringify({ userId: user.id, role: user.role })
        });
        if (response.ok) {
            loadRecipes();
        } else {
            alert('Error deleting recipe');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadReviews() {
    try {
        const response = await fetch('/api/admin/reviews', {
            headers: { 'role': user.role }
        });
        const reviews = await response.json();

        const tbody = document.querySelector('#reviews-table tbody');
        tbody.innerHTML = '';

        reviews.forEach(review => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${review.id}</td>
                <td>${review.recipeTitle}</td>
                <td>${review.userName || 'Unknown'}</td>
                <td>${review.rating}</td>
                <td>${review.comment}</td>
                <td>
                    <button class="btn-danger btn-sm" onclick="deleteReview(${review.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

async function deleteReview(id) {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
        const response = await fetch(`/api/admin/reviews/${id}`, {
            method: 'DELETE',
            headers: { 'role': user.role }
        });
        if (response.ok) {
            loadReviews();
        } else {
            alert('Error deleting review');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadMessages() {
    try {
        const response = await fetch('/api/admin/contact', {
            headers: { 'role': user.role }
        });
        const messages = await response.json();

        const tbody = document.querySelector('#messages-table tbody');
        tbody.innerHTML = '';

        messages.forEach(msg => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${msg.id}</td>
                <td>${msg.name}</td>
                <td>${msg.email}</td>
                <td>${msg.message}</td>
                <td>${new Date(msg.createdAt).toLocaleDateString()}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}
