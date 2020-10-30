//update dark mode form image

const darkAvatar = document.querySelector('#dark-avatar');
const toggleBtn= document.querySelector('.switch-btn');

toggleBtn.addEventListener('click', () => {
    if(darkMode){
        darkAvatar.innerHTML = `<img src="../assets/images/darkavatar-kit.jpg" alt="contact form image">`;
    }else{
        darkAvatar.innerHTML = `<img src="../assets/images/avatar-kit.jpg" alt="contact form image">`;
    }
})


// authenticating users and store credentials to firebase
const signupForm = document.querySelector('#signup-form');
const signupResult = document.querySelector('#signup-result');
const name = signupForm['name-input'];
const email = signupForm['email-input'];
const password = signupForm['password-input'];
const cfrmPass = signupForm['password-confirm'];
const signupBtn = signupForm['sign-up-btn'];

const inputValidation  = (fullName, mail, pswd, cfrPass, form) => {
    const emailRegex = /^[a-z]+([a-z0-9_\-\.]){1,}\@([a-z0-9_\-\.]){1,}\.([a-z]{2,4})$/;
    const nameRegex = /^([^0-9])+([a-zA-Z]{1,})$/; 
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,12}$/;

    if (fullName.length === 0) {
        name.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Name is required!';
        return false;
      } else if (!nameRegex.test(fullName)) {
        name.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Name should be valid'
        return false;
      } else if (mail.length === 0) {
        email.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Email is required';
        return false;
      } else if (!emailRegex.test(mail)) {
        email.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Invalid email'
        return false;
      } else if (pswd.length === 0) {
        password.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Password is required!'
        return false;
      }else if (pswd.length < 6) {
        password.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Password must be at least 6 characters'
        return false;
      } else if (!passRegex.test(pswd)) {
        password.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Password should contains at least 1 number lowercase and uppercase characters!'
        return false;
      }  else if (cfrPass.length === 0) {
        cfrmPass.style.borderBottom = '1px solid red';
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Comfirm your password';
        return false;
      } else if (pswd !== cfrPass) {
          cfrmPass.style.borderBottom = '1px solid red';
          signupResult.style.color = '#DF502A';
          signupResult.innerHTML = 'Password not match';
          return false;
      } else {
          submitForm(name.value, email.value, password.value, form)
      }
}

const submitForm = async(name, email, password, form) => {

    await auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
       return db.collection('users').doc(cred.user.uid).set({
            FullName: name,
            Email: email,
            createdAt: new Intl.DateTimeFormat('en-US', { dateStyle:'long'}).format( new Date()),
            role: 'regular user'
        })
    })
    .then(() => {  
        form.reset();
        signupBtn.innerHTML = 'Signup';
        signupResult.style.color = '#008B8B';
        signupResult.innerHTML = 'Account created successsfully';
        window.location.href = '../login/';
    })
    .catch(() => {
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = 'Something went wrong';
    })
    saveUser(name)
}

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signupBtn.innerHTML = 'Loading .....';
    inputValidation(name.value, email.value, password.value, cfrmPass.value, signupForm);
});

//function to update display name
async function saveUser(name) {
    const user = auth.currentUser;
    await user.updateProfile({
        displayName: name,
    })
    .then(() => {
        return true;
    })
    .catch(() => {
        signupResult.innerHTML = 'unable to update display name';
    })
}

//clear the error on keydown
const inputs = document.querySelectorAll('input')
 inputs.forEach(input => input.addEventListener('keydown', () => {
    signupBtn.innerHTML = 'Singup';
    signupResult.innerHTML = '';
}) )
