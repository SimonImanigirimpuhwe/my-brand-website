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

// server link
const url = 'https://simon-tech-site.herokuapp.com';

//firebase user authentication
const loginForm = document.querySelector('#login-form');
const email = loginForm['email-input'];
const password = loginForm['password-input'];
const loginBtn = loginForm['login-btn'];
const loginResult = document.querySelector('#login-result');

//function to validate form fields before submission
const validateForm = (mail, pswd, form) => {
  const emailPattern = /^[a-z]+([a-zA-Z0-9_\-\.]){1,}\@([a-z0-9_\-\.]){1,}\.([a-z]{2,4})$/;
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
      }  else {
        loginFnc(email.value, password.value, form)
      }
}

//login user
async function loginFnc(email, password, form) {
    fetch(`${url}/users/login`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({
          email,
          password
      })
  })
  .then(handleResponse)
  .then((result) => { 
      if (result.error) {
        loginResult.style.color = '#DF502A';
        loginResult.innerHTML = result.error
      } else {
        form.reset();
        loginBtn.innerHTML = 'Login';
        loginResult.style.color = '#008B8B';
        sessionStorage.setItem('s-techToken', result.token)
        loginResult.innerHTML = result.message;
        setTimeout(() => {
          window.location.href = '../admin/';
        }, 3000)
      }
  })
  .catch((err) => {
    loginResult.style.color = '#DF502A';
    loginResult.innerHTML = 'Something went wrong';
  })
}



// handle fetch response
function handleResponse(response){
  let contentType = response.headers.get('content-type')

  if (contentType.includes('application/json')){
      return response.json()
  } else if (contentType.includes('text/html')) {
      return response.text()
  } else {
      throw new Error(`content-type ${contentType} is not supported`)
  }
};


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
