const commentForm = document.querySelector('.comment-form');
const commentIcon = document.querySelector('.fa-comments');


const showForm = () => {
    commentForm.style.display = 'flex'
    console.log('clicked')
}
commentIcon.addEventListener('click', showForm)