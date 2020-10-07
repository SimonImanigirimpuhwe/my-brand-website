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
  const emailPattern = /^[a-z]+([a-zA-Z0-9_\-\.]){1,}\@([a-z0-9_\-\.]){1,}\.([a-z]{2,4})$/;
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,12}$/;
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
      } else if (!passRegex.test(pswd)) {
        password.style.borderBottom = '1px solid red';
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = 'Password must contain at least 1 number, uppercase and lowercase characters'
        return false;
      } else {
        loginFnc(email.value, password.value, form)
      }
}

//login user
let isLogged = false;
async function loginFnc(email, password, form) {
    isLogged = true;
    await auth
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      isLogged = false;
      loginResult.style.color = '#DF502A';
      loginResult.innerHTML = err.message;
    })
    checkSuccess(form)
}

//check success
function checkSuccess(form) {
  if (isLogged) {
    location.href = '../admin/';
    form.reset();
    loginBtn.innerHTML = 'Login';
    loginResult.style.color = '#008B8B';
    loginResult.innerHTML = 'Logged in successfully';
  }
}

//function to submit the form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginBtn.innerHTML = 'Loading .....'
    validateForm(email.value, password.value, loginForm)
})

//clear the error on keydown
const inputs = document.querySelectorAll('input');
 inputs.forEach(input => input.addEventListener('keydown', () => {
    loginResult.innerHTML = 'Login';
    loginResult.innerHTML = '';
}) )

// function to reset password
const forgetPass = document.querySelector('#forget-pass');

forgetPass.addEventListener('click', () => {
  const email = document.querySelector('#email-input')
  const emailAddress = email.value;
  const emailPattern = /^[a-z]+([a-zA-Z0-9_\-\.]){1,}\@([a-z0-9_\-\.]){1,}\.([a-z]{2,4})$/;

  if (emailAddress.length === 0) {
      email.style.borderBottom = '1px solid red';
      loginResult.style.color = '#DF502A';
      loginResult.innerHTML = 'Email is required';
      return false;
    } else if (!emailPattern.test(emailAddress)) {
      email.style.borderBottom = '1px solid red';
      loginResult.style.color = '#DF502A';
      loginResult.innerHTML = 'Invalid email';
      return false;
    } else {
      auth.sendPasswordResetEmail(emailAddress).then(() => {
        loginResult.style.color = '#008B8B';
        loginResult.innerHTML = 'Email sent!';
        if (loginResult.innerHTML === 'Email sent!') {
          loginForm.reset()
          loginBtn.innerHTML = 'Login'
        } else {
          loginBtn.innerHTML = 'Loading .....';
        }
      }).catch((error) => {
        if (error.code === "auth/user-not-found") {
          loginResult.style.color = '#DF502A';
          loginResult.innerHTML = "Email not found!";
        } else {
          loginResult.style.color = '#DF502A';
          loginResult.innerHTML = "Something went wrong!";
        }
      });
    }
})