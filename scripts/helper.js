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

/*
activate dark mode
*/

const toggleSwitch = document.querySelectorAll('.switch-btn');
const logo = document.querySelectorAll('#logo');
const body = document.querySelector('body')
const lightMode = document.querySelectorAll('.light-mode');



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


//setup firebase connection
var firebaseConfig = {
    apiKey: "AIzaSyBSYtGMcFcj0KSWu3mjKqTKRr6S5JmwMeA",
    authDomain: "my-brand-p-website.firebaseapp.com",
    databaseURL: "https://my-brand-p-website.firebaseio.com",
    projectId: "my-brand-p-website",
    storageBucket: "my-brand-p-website.appspot.com",
    messagingSenderId: "604559782516",
    appId: "1:604559782516:web:d4d9c4fa2eb44544285721",
    measurementId: "G-597HBL7D03"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();



