document.addEventListener('DOMContentLoaded', async () => {
    const categorySelect = document.getElementById('post-category');

    // Fetch categories from Supabase
    const { data: categories, error } = await supabase.from('categories').select();

    if (error) {
        console.error(error);
    } else {
        // Populate the category dropdown
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }

    // Form submission logic remains the same, but send `category_id` instead of `category`
    const addPostForm = document.getElementById('add-post-form');
    addPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('post-title').value;
        const category_id = document.getElementById('post-category').value; // Capture category ID
        const price = document.getElementById('post-price').value;
        const description = document.getElementById('post-description').value;
        const images = document.getElementById('post-images').files;

        // Upload images and create the post logic (as described previously)

        // Save the post with category_id
        const { error: postError } = await supabase.from('posts').insert({
            title,
            category_id, // Store category ID instead of name
            price,
            description,
            image_urls: imageUrls,
            user_id: supabase.auth.user().id
        });

        if (postError) {
            console.error(postError);
        } else {
            window.location.href = 'user.html';
        }
    });
});
