document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert(error.message);
    } else {
        window.location.href = 'login.html';
    }
});