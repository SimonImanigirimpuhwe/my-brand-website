const dashBoard = document.querySelector('.dashboard');
const dashBoardContent = document.querySelector('.dashboard-content');
const profilePopup = document.querySelector('.profile-popup');
const ellipsisIcon = document.querySelector('.fa-ellipsis-v');
const userProfile = document.querySelectorAll('.profile');
const logOutBtn = document.querySelector('.fa-sign-out-alt');
const editProfileBtn = document.querySelector('.edit-profile');
const editForm = document.querySelector('.edit-admin-profile');
const addArticleForm = document.querySelector('.add-new-article');
const addArticleBtn = document.querySelector('.add-post-btn');
const viewAllBtn = document.querySelector('.view-all-articles');
const articlesList = document.querySelector('.articles-list');





dashBoard.addEventListener('click', showDashBoard);
ellipsisIcon.addEventListener('click', showProfile);
userProfile.forEach(icon => icon.addEventListener('click', showUserProfile));
logOutBtn.addEventListener('click', logOutfn);
editProfileBtn.addEventListener('click', editProfile);
addArticleBtn.addEventListener('click', addArticle);
viewAllBtn.addEventListener('click', viewAllArticles)

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
  dashBoardContent.classList.toggle('toggle-visibility')
}

function showProfile() {
  const profileSetting = document.querySelector('.dashboard-more');
  profileSetting.classList.toggle('active')
}

function showUserProfile() {
  if(dashBoardContent.classList.contains('toggle-visibility')){
    dashBoardContent.classList.remove('toggle-visibility')
  }
  if(addArticleForm.style.display = 'flex'){
    addArticleForm.style.display = 'none';
  }
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  profilePopup.classList.toggle('display')
  editForm.style.display = 'none';
}

function logOutfn() {
  location.href = '../login/index.html'
}

function editProfile() {
  if(editForm.style.display = 'flex'){
    profilePopup.classList.remove('display')
  }
  editForm.style.display = 'flex';
}

function addArticle() {
  clearBoard()
  addArticleForm.style.display = 'flex';
}

function viewAllArticles() {
  clearBoard()
  articlesList.classList.toggle('show')
  editForm.style.display = 'none';
}

function clearBoard() {
  if(dashBoardContent.classList.contains('toggle-visibility')){
    dashBoardContent.classList.remove('toggle-visibility')
  }
  if(profilePopup.classList.contains('display')){
    profilePopup.classList.toggle('display')
  }
}