const dashBoard = document.querySelector('.dashboard');
const dashBoardContent = document.querySelector('.dashboard-content');
const profilePopup = document.querySelector('.profile-popup');
const ellipsisIcon = document.querySelector('.fa-ellipsis-v');
const userProfile = document.querySelectorAll('.profile');
const logOutBtn = document.querySelector('.fa-sign-out-alt');
const editProfileBtn = document.querySelector('.edit-profile');




dashBoard.addEventListener('click', () => {
  dashBoardContent.classList.toggle('toggle-visibility')
})
ellipsisIcon.addEventListener('click', showProfile);
userProfile.forEach(icon => icon.addEventListener('click', showUserProfile));
logOutBtn.addEventListener('click', logOutfn);
editProfileBtn.addEventListener('click', editProfile)

function showProfile() {
  const profileSetting = document.querySelector('.dashboard-more');
  profileSetting.classList.toggle('active')
}

function showUserProfile() {
  profilePopup.classList.toggle('display')
}

function logOutfn() {
  location.href = '../login/index.html'
}

function editProfile() {
  const editForm = document.querySelector('.edit-admin-profile');
  editForm.style.display = 'flex';
  
}