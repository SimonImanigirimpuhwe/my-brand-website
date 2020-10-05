const dashBoardContent = domElement(".dashboard-content");
const profilePopup = domElement(".profile-popup");
const editForm = domElement(".edit-admin-profile");
const addArticleForm = domElement(".add-new-article");
const articlesList = domElement(".articles-list");
const editArticleForm = domElement(".update-existing-article");


domElement(".dashboard").addEventListener('click', showDashBoard);
domElement(".fa-ellipsis-v").addEventListener('click', showProfile);
domNodeList(".profile").forEach(icon => icon.addEventListener('click', showUserProfile));
domElement(".edit-profile").addEventListener('click', editProfile);
domElement(".add-post-btn").addEventListener('click', addArticle);
domElement(".view-all-articles").addEventListener('click', viewAllArticles);
domNodeList(".fa-edit").forEach(btn => btn.addEventListener('click', updateArticle));

function showDashBoard() {
  if(editForm.style.display = 'flex'){
    editForm.style.display = 'none';
  }
  if(profilePopup.classList.contains('display')){
    profilePopup.classList.remove('display')
  }
  if(addArticleForm.style.display = 'flex'){
    addArticleForm.style.display = 'none';
  }
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  editArticleForm.style.display = 'none';
  warnContiner.style.display = 'none';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
  dashBoardContent.classList.toggle('toggle-visibility')
}

function showProfile() {
  const profileSetting = document.querySelector('.dashboard-more');
  profileSetting.classList.toggle('active')
}

function showUserProfile() {
  if(addArticleForm.style.display = 'flex'){
    addArticleForm.style.display = 'none';
  }
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  dashBoardContent.classList.add('toggle-visibility')
  profilePopup.classList.toggle('display')
  editForm.style.display = 'none';
  editArticleForm.style.display = 'none';
  warnContiner.style.display = 'none';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
}

function editProfile() {
  if(editForm.style.display = 'flex'){
    profilePopup.classList.remove('display')
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  editForm.style.display = 'flex';
  editArticleForm.style.display = 'none';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
}

function addArticle() {
  clearBoard()
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  editArticleForm.style.display = 'none';
  addArticleForm.style.display = 'flex';
  warnContiner.style.display = 'none';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
}

function viewAllArticles() {
  clearBoard()
  if(addArticleForm.style.display = 'flex'){
    addArticleForm.style.display = 'none';
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  articlesList.classList.toggle('show')
  editForm.style.display = 'none';
  addArticleForm.style.display = 'none';
  table.style.display = 'none';
  settingContainer.style.display = 'none';

}

function clearBoard() {
    dashBoardContent.classList.add('toggle-visibility')
  if(profilePopup.classList.contains('display')){
    profilePopup.classList.toggle('display')
  }
}

function updateArticle() {
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  editArticleForm.style.display = 'flex';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
}


//warning for delete an article
const warnContiner = domElement(".warn-container");

domNodeList(".fa-trash-alt").forEach(btn => btn.addEventListener('click', deleteArticle));

function deleteArticle() {
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  warnContiner.style.display = 'flex';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
  warningCard();
}

function warningCard() {
  return   warnContiner.innerHTML =
  `<div class="warn">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Be aware that the action you are going to take is irreversible once it’s done.</p>
      <div id="cfrm-btn">
        <button id="cancel">Cancel</button>
        <button id="confirm">Delete</button>
      </div>
   </div>
  `;
}

//display queries page

const queriesBtn = domElement(".fa-envelope-open-text");
const queriesContainer = domElement(".queries-container-page");
const queryCard = domElement(".blog-inquiry");

queriesBtn.addEventListener('click', showQueries);
queryCard.addEventListener('click', showQueries)

function showQueries() {
  dashBoardContent.classList.add('toggle-visibility')
  if(editForm.style.display = 'flex'){
    editForm.style.display = 'none';
  }
  if(profilePopup.classList.contains('display')){
    profilePopup.classList.remove('display')
  }
  if(addArticleForm.style.display = 'flex'){
    addArticleForm.style.display = 'none';
  }
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  warnContiner.style.display = 'none';
  queriesContainer.style.display ='flex';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
}

//delete user
const table = domElement("table");
domElement(".fa-trash").addEventListener('click', () =>{
  table.style.display = 'none'
  warnContiner.style.display = 'flex';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
  clearBoard();
  warningCard()
})

//Event to display manage users page
domElement(".manage-users").addEventListener('click', allUsers)

function allUsers() {
  clearBoard()
  table.style.display = 'flex';
  settingContainer.style.display = 'none';   
}

//user settings
const settingContainer = domElement(".users-settings");

domElement(".settings").addEventListener('click', userSetting);

function userSetting() {
  clearBoard()
  settingContainer.style.display = 'flex';
  table.style.display = 'none'
}

//customise dashboard reponsiveness
const dashBoardHamburgIcon = domElement(".fa-bars");
const dashboardMenu = domElement(".dashboard-menu-wrapper");
const dashboardSpanIcon = domElement(".span");


dashboardSpanIcon.addEventListener('click', () => {
    dashBoardHamburgIconDisplay = !dashBoardHamburgIconDisplay;
    showNav()
})

let dashBoardHamburgIconDisplay = false;
function showNav() {
    if(dashBoardHamburgIconDisplay){
        dashboardMenu.classList.add('dashboard-menu-display');
        dashboardMenu.style.display = 'flex';
        dashboardSpanIcon.innerHTML = `<i class="fas fa-times"></i>`;
    }else{
        dashboardMenu.classList.remove('dashboard-menu-display');
        dashboardMenu.style.display = 'none';
        dashboardSpanIcon.innerHTML = `<i class="fas fa-bars"></i>`;
    }
}

