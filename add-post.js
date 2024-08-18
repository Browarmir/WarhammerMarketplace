document.addEventListener('DOMContentLoaded', async () => {
    const categorySelect = document.getElementById('post-category');

    const { data: categories } = await supabase.from('categories').select();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
    });

    document.getElementById('add-post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const category = document.getElementById('post-category').value;
        const price = document.getElementById('post-price').value;
        const description = document.getElementById('post-description').value;

        const images = document.getElementById('post-images').files;
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const { data, error } = await supabase.storage.from('posts').upload(`${Date.now()}_${image.name}`, image);
            if (error) {
                alert('Error uploading image');
                return;
            }
            imageUrls.push(data.Key);
        }

        const { error } = await supabase.from('posts').insert({
            title,
            category_id: category,
            price,
            description,
            image_urls: imageUrls,
            user_id: (await supabase.auth.getUser()).data.user.id,
        });

        if (error) {
            alert('Error creating post');
        } else {
            window.location.href = 'index.html';
        }
    });
});
