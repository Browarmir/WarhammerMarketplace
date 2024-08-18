document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Sign up the user with Supabase
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            alert('Error: ' + error.message);
        } else {
            alert('Registration successful!');
            window.location.href = 'index.html'; // Redirect to login
        }
    });
});
