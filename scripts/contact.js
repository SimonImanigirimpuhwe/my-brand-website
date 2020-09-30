const darkImage = document.querySelector('#dark-image');
const toggleBtn= document.querySelector('.switch-btn');

toggleBtn.addEventListener('click', () => {
    if(darkMode){
        darkImage.innerHTML = `<img src="../assets/images/darkquery-avatar.jpg" alt="contact form image">`;
    }else{
        darkImage.innerHTML = `<img src="../assets/images/query-avatar.jpg" alt="contact form image">`;
    }
})