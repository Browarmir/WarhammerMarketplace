document.addEventListener('DOMContentLoaded', async () => {
    const categoryList = document.getElementById('category-list');
    const postList = document.getElementById('post-list');

    const { data: categories } = await supabase.from('categories').select();
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category.name;
        li.addEventListener('click', () => loadPosts(category.id));
        categoryList.appendChild(li);
    });

    async function loadPosts(categoryId) {
        const { data: posts } = await supabase.from('posts').select().eq('category_id', categoryId);
        postList.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <p>Price: $${post.price}</p>
                <p>Posted on: ${new Date(post.created_at).toLocaleDateString()}</p>
            `;
            postList.appendChild(postDiv);
        });
    }

    // Load latest posts on page load
    loadPosts();
});
