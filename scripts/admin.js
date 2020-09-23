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
const editArticleForm = document.querySelector('.update-existing-article');
const editArticleBtn = document.querySelectorAll('.fa-edit')





dashBoard.addEventListener('click', showDashBoard);
ellipsisIcon.addEventListener('click', showProfile);
userProfile.forEach(icon => icon.addEventListener('click', showUserProfile));
logOutBtn.addEventListener('click', logOutfn);
editProfileBtn.addEventListener('click', editProfile);
addArticleBtn.addEventListener('click', addArticle);
viewAllBtn.addEventListener('click', viewAllArticles);
editArticleBtn.forEach(btn => btn.addEventListener('click', updateArticle));

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
  editArticleForm.style.display = 'none';
  warnContiner.style.display = 'none';
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
  editArticleForm.style.display = 'none';
  warnContiner.style.display = 'none';
}

function logOutfn() {
  location.href = '../login/index.html'
}

function editProfile() {
  if(editForm.style.display = 'flex'){
    profilePopup.classList.remove('display')
  }
  editForm.style.display = 'flex';
  editArticleForm.style.display = 'none';
}

function addArticle() {
  clearBoard()
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  editArticleForm.style.display = 'none';
  addArticleForm.style.display = 'flex';
  warnContiner.style.display = 'none';
}

function viewAllArticles() {
  clearBoard()
  if(addArticleForm.style.display = 'flex'){
    addArticleForm.style.display = 'none';
  }
  articlesList.classList.toggle('show')
  editForm.style.display = 'none';
  addArticleForm.style.display = 'none';

}

function clearBoard() {
  if(dashBoardContent.classList.contains('toggle-visibility')){
    dashBoardContent.classList.remove('toggle-visibility')
  }
  if(profilePopup.classList.contains('display')){
    profilePopup.classList.toggle('display')
  }
}

function updateArticle() {
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  editArticleForm.style.display = 'flex'
}

/*...........
warning for delet an article
*/

const deleteBtn = document.querySelectorAll('.fa-trash-alt');
const warnContiner = document.querySelector('.warn-container');

deleteBtn.forEach(btn => btn.addEventListener('click', deleteArticle));

function deleteArticle() {
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  warnContiner.style.display = 'flex';
   warnContiner.innerHTML =
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
