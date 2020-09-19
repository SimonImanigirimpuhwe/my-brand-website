const selectedPost = document.querySelectorAll('#article-card');

selectedPost.forEach(post => post.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = '../blog/article.html';
}))