//update dark mode form image

const darkAvatar = document.querySelector('#dark-undr');
const toggleBtn= document.querySelector('.switch-btn');

toggleBtn.addEventListener('click', () => {
    if(darkMode){
        darkAvatar.innerHTML = `<img src="../assets/images/darklogin-undr.jpg" alt="contact form image">`;
    }else{
        darkAvatar.innerHTML = `<img src="../assets/images/login-undr.jpg" alt="contact form image">`;
    }
})


//firebase user authentication
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginFnc()
})

async function loginFnc() {
    const email = loginForm['email-input'].value;
    const password = loginForm['password-input'].value;
    const loginResult = document.querySelector('#login-result');

    await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        loginForm.reset();
        location.href = '../admin/index.html';
        loginResult.innerHTML = 'logged in successfully';
    })
    .catch(err => {
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = err.message;
    })
}