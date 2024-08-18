document.addEventListener('DOMContentLoaded', async () => {
    const categoryList = document.getElementById('category-list');
    const postList = document.getElementById('post-list');

    // Fetch categories from Supabase
    const { data: categories, error: categoryError } = await supabase.from('categories').select();
    if (categoryError) {
        console.error(categoryError);
    } else {
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category.name;
            li.addEventListener('click', () => filterPostsByCategory(category.id));
            categoryList.appendChild(li);
        });
    }

    // Fetch all posts initially
    const { data: posts, error: postError } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (postError) {
        console.error(postError);
    } else {
        displayPosts(posts);
    }

    // Function to filter posts by category
    async function filterPostsByCategory(category_id) {
        const { data: filteredPosts, error: filterError } = await supabase
            .from('posts')
            .select('*')
            .eq('category_id', category_id)
            .order('created_at', { ascending: false });

        if (filterError) {
            console.error(filterError);
        } else {
            displayPosts(filteredPosts);
        }
    }

    // Function to display posts
    function displayPosts(posts) {
        postList.innerHTML = ''; // Clear the post list
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-card');
            postDiv.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.description}</p>
                <p><strong>Price:</strong> $${post.price}</p>
            `;
            postList.appendChild(postDiv);
        });
    }
});