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
const email = loginForm['email-input'];
const password = loginForm['password-input'];
const loginBtn = loginForm['login-btn'];
const loginResult = document.querySelector('#login-result');

//function to validate form fields before submission
const validateForm = (mail, pswd, form) => {
    const emailPattern = /^[a-z]+([a-z0-9_\-\.]){1,}\@([a-z0-9_\-\.]){1,}\.([a-z]{2,4})$/;

    if (mail.length === 0) {
        email.style.borderBottom = '1px solid red';
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = 'Email is required';
        return false;
      } else if (!emailPattern.test(mail)) {
        email.style.borderBottom = '1px solid red';
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = 'Invalid email'
        return false;
      } else if (pswd.length === 0) {
        password.style.borderBottom = '1px solid red';
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = 'Password is required!'
        return false;
      } else if (pswd.length < 6) {
        password.style.borderBottom = '1px solid red';
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = 'Password must be at least 6 characters'
        return false;
      } else {
        loginFnc(email.value, password.value, form)
      }
}

//login user
async function loginFnc(email, password, form) {
    await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        form.reset();
        loginBtn.innerHTML = 'Login';
        loginResult.style.color = '#008B8B';
        loginResult.innerHTML = 'Logged in successfully';
        location.href = '../admin/index.html';
    })
    .catch(err => {
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = err.message;
    })
}

//function to submit the form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginBtn.innerHTML = 'Loading .....'
    validateForm(email.value, password.value, loginForm)
})
