const domElement = function(value){
    return document.querySelector(value);
  };
const domNodeList = function(value) {
return document.querySelectorAll(value);
};

const hambergIcon = domElement(".fa-bars");
const menu = domElement("nav");
const spanIcon = domElement(".span");


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


//activate dark mode
const toggleSwitch = domNodeList(".switch-btn");
const logo = domNodeList("#logo");
const body = domElement("body");
const lightMode = domNodeList(".light-mode");



toggleSwitch.forEach(btn => btn.addEventListener('click', () =>{
    darkMode = !darkMode;
    changeMode()
}));

let darkMode = false;
function changeMode() {
    if(darkMode){
        toggleSwitch.forEach(icon => icon.innerHTML= `<i class="fas fa-sun"></i>`) 
        logo.forEach(img => img.innerHTML = `<img src="../assets/images/darklogo.jpg" alt="logo">`)
        body.classList.add('dark-mode')
        lightMode.forEach(section => section.classList.add('dark-mode'))
    }else {
        toggleSwitch.forEach(icon => icon.innerHTML= `<i class="fas fa-moon"></i>`)
        logo.forEach(img => img.innerHTML = `<img src="../assets/images/nlogo.jpg" alt="logo">`)
        body.classList.remove('dark-mode') 
        lightMode.forEach(section => section.classList.remove('dark-mode'))
    }   
}




