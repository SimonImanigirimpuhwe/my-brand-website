const blogCard = document.querySelectorAll('.card');

blogCard.forEach(card => card.addEventListener('click', openPost))

function openPost() {
    location.href = './blog/article.html'
}

/*======================================
activate dark mode
====================================
*/
