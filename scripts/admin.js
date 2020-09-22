const dashBoard = document.querySelector('.dashboard');
const dashBoardContent = document.querySelector('.dashboard-content')

dashBoard.addEventListener('click', (e) => {
  dashBoardContent.classList.toggle('toggle-visibility')
})
