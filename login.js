document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
        alert(error.message);
    } else {
        window.location.href = 'user.html';
    }
});