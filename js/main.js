document.addEventListener('DOMContentLoaded', async () => {
    const authSection = document.getElementById('auth-section');

    // Check if the user is logged in
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // User is logged in
        authSection.innerHTML = `
            <p>Welcome, ${user.email}</p>
            <button id="view-profile">View Profile</button>
            <button id="logout-button">Logout</button>
        `;

        document.getElementById('view-profile').addEventListener('click', () => {
            window.location.href = 'user.html';
        });

        document.getElementById('logout-button').addEventListener('click', async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                window.location.reload();
            }
        });

    } else {
        // User is not logged in
        authSection.innerHTML = `
            <button id="login-button">Login</button>
            <button id="register-button">Register</button>
        `;

        document.getElementById('login-button').addEventListener('click', () => {
            window.location.href = 'login.html';
        });

        document.getElementById('register-button').addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }
});