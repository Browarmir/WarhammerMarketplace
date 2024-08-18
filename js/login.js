document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Log the user in with Supabase
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password
        });

        if (error) {
            alert('Error: ' + error.message);
        } else {
            window.location.href = 'user.html'; // Redirect to user's posts
        }
    });
});