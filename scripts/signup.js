const signupBtn = document.querySelector('#sign-up-btn');

signupBtn.addEventListener('click', signupFn)

function signupFn(e) {
    e.preventDefault();
    location.href = '../admin/index.html';
}