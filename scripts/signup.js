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

