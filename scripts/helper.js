const hambergIcon = document.querySelector('fa-bars');
const menu = document.querySelector('nav');
const spanIcon = document.querySelector('.span');


spanIcon.addEventListener('click', () => {
    hambergIconDisplay = !hambergIconDisplay;
    showNav()
})

let hambergIconDisplay = false;
function showNav() {
    if(hambergIconDisplay){
        menu.classList.add('dropdown');
        menu.style.display = 'block';
        spanIcon.innerHTML = `<i class="fas fa-times"></i>`;
    }else{
        menu.classList.remove('dropdown');
        menu.style.display = 'none';
        spanIcon.innerHTML = `<i class="fas fa-bars"></i>`;
    }
}