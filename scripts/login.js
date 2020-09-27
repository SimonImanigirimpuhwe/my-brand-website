const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener('click', loginFn)

function loginFn(e) {
    e.preventDefault();
    location.href = '../admin/index.html';
}

/*
update dark mode form image
*/
const darkAvatar = document.querySelector('#dark-undr');
const toggleBtn= document.querySelector('.switch-btn');

toggleBtn.addEventListener('click', () => {
    if(darkMode){
        darkAvatar.innerHTML = `<img src="../assets/images/login-undr.jpg" alt="contact form image">`;
    }else{
        darkAvatar.innerHTML = `<img src="../assets/images/darklogin-undr.jpg" alt="contact form image">`;
    }
})