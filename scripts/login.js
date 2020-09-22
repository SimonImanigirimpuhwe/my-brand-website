const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener('click', loginFn)

function loginFn(e) {
    e.preventDefault();
    location.href = '../admin/index.html';
}