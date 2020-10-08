const commentForm = document.querySelector('.comment-form');
const commentIcon = document.querySelector('#comment-display-btn');


const showForm = () => {
    commentForm.style.display = 'flex';
}
commentIcon.addEventListener('click', showForm)

