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
const email = document.querySelector('#email-input')
const signupResult = document.querySelector('#signup-result');

const submitForm = async() => {
    const name = signupForm['name-input'].value;
    const email = signupForm['email-input'].value;
    const password = signupForm['password-input'].value;


    await auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        signupForm.reset();
        location.href = '../admin/index.html';
        signupResult.innerHTML = 'Account created successsfully';
    })
    .catch(err => {
        signupResult.style.color = '#DF502A';
        signupResult.innerHTML = err.message;
    })
    saveUser(name)
}

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
});

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
