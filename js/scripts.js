function sortPosts(criterion) {
    const postList = document.getElementById('post-list');
    const posts = Array.from(postList.getElementsByClassName('post'));

    posts.sort((a, b) => {
        const aValue = criterion === 'price' ? parseFloat(a.dataset.price) : a.dataset.name.toLowerCase();
        const bValue = criterion === 'price' ? parseFloat(b.dataset.price) : b.dataset.name.toLowerCase();

        if (aValue < bValue) {
            return -1;
        }
        if (aValue > bValue) {
            return 1;
        }
        return 0;
    });

    // Clear existing posts and re-append sorted posts
    postList.innerHTML = '';
    posts.forEach(post => postList.appendChild(post));
}

// Initialize Supabase
const supabaseUrl = 'https://cgqwklizyykmrurgbeoh.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncXdrbGl6eXlrbXJ1cmdiZW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwMDIwMTUsImV4cCI6MjAzOTU3ODAxNX0.L0vvjYinKNGkPNgh-PqHYMuHzTjuDC-_URFFajt7aOU'; // Replace with your Supabase public API key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


if (document.getElementById('register-button') != null){
    document.getElementById('register-button').addEventListener('click', async () => {
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const registerMessage = document.getElementById('register-message');

        // Clear previous messages
        registerMessage.textContent = '';

        // Attempt to register the user
        const { user, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error('Error during registration:', error);
            registerMessage.textContent = 'Registration failed: ' + error.message;
        } else {
            console.log('User registered:', user);
            registerMessage.textContent = 'Registration successful! You can now log in.';
        }
    });
}
if (document.getElementById('login-button') != null){
    document.getElementById('login-button').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const loginMessage = document.getElementById('login-message');
    
        // Clear previous messages
        loginMessage.textContent = '';
    
        // Attempt to log in the user
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
    
        if (error) {
            console.error('Error during login:', error);
            loginMessage.textContent = 'Login failed: ' + error.message;
        } else {
            console.log('User logged in:', data.user);
            loginMessage.textContent = 'Login successful!';
    
            // Update the UI
            updateUIForLoggedInUser(data.user); // Call a function to update the UI for logged in user
        }
    });
}

function updateUIForLoggedInUser(user) {
    // Display the username
    const username = user.email;  // Supabase stores user email by default
    if (document.getElementById('username-display')!= null){
        document.getElementById('username-display').textContent = `Logged in as: ${username}`;
    }
    // Show the "Log Out" button and hide the "Log In" button
    if (document.getElementById('login-button')){
        document.getElementById('login-button').style.display = 'none';
    }
    if (document.getElementById('logout-button')){
        document.getElementById('logout-button').style.display = 'block';
    }
}

// Function to update the UI after the user logs out
function updateUIForLoggedOutUser() {
    // Hide the username
    if (document.getElementById('username-display')){
        document.getElementById('username-display').textContent = '';
    }
    // Show the "Log In" button and hide the "Log Out" button
    if (document.getElementById('login-button')){
        document.getElementById('login-button').style.display = 'block';
    }
    if (document.getElementById('logout-button')){
        document.getElementById('logout-button').style.display = 'none';
    }
}
if (document.getElementById('logout-button') != null){
    document.getElementById('logout-button').addEventListener('click', async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            console.error('Error during logout:', error);
            alert('Logout failed: ' + error.message);
        } else {
            console.log('User logged out');
            updateUIForLoggedOutUser(); // Update UI to reflect the logged-out state
        }
    });
}

window.onload = async () => {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error('Error fetching session:', error);
        return;
    }

    const session = data.session;

    if (session && session.user) {
        updateUIForLoggedInUser(session.user);  // User is logged in, update the UI
    } else {
        updateUIForLoggedOutUser();  // No user is logged in, show the default UI
    }
};

