const dashBoardContent = domElement(".dashboard-content");
const profilePopup = domElement(".profile-popup");
const editForm = domElement(".edit-admin-profile");
const addArticleForm = domElement(".add-new-article");
const articlesList = domElement(".articles-list");
const editArticleForm = domElement(".update-existing-article");
const deleteMessage = domElement(".delete-message")


domElement(".dashboard-menu").addEventListener('click', showDashBoard);
domElement(".fa-ellipsis-v").addEventListener('click', showProfile);
domNodeList(".profile-menu").forEach(icon => icon.addEventListener('click', showUserProfile));
domElement(".edit-profile").addEventListener('click', editProfile);
domElement(".add-post-btn-menu").addEventListener('click', addArticle);
domElement(".view-article-btn").addEventListener('click', viewAllArticles);
domElement(".blog-number-card").addEventListener('click', viewAllArticles);

//article update form display
domElement(".articles-list").addEventListener('click', (e) => {
  if (!e.target.classList.contains('fa-edit')) return;
  let id = e
  .target
  .parentElement
  .parentElement
  .parentElement
  .getAttribute('data-id');

  updateArticle(id)
  handleArticleUpdate(id);
})

function handleArticleUpdate(id) {
  editArticleForm.onsubmit = (e) => {
    e.preventDefault();
    const title = domElement('#update-title').value;
    const description = domElement('#update-description').value;
    const updateResult = domElement('.article-edit-error');

    if (title == '' || description == '') {
      updateResult.style.display = 'flex';
      updateResult.style.color = '#DF502A';
      updateResult.innerHTML = 'Please fill the form fields';
    } else {    
      db.collection('blogs').doc(id).update({
        Title:title,
        Description: description
      })
      .then(() => {
        editArticleForm.reset()
        updateResult.style.color = '#008B8B'
        updateResult.innerHTML = 'Blog updated successfully';
        setTimeout(() => {
          editArticleForm.style.display = 'none';
        }, 3000);
      })
    }
  }
}

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
  savePost()
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

function updateArticle(id) {
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  if(queriesContainer.style.display ='flex') {
    queriesContainer.style.display ='none';
  }
  editArticleForm.style.display = 'flex';
  table.style.display = 'none';
  settingContainer.style.display = 'none';
  const title = domElement('#update-title');
  const description = domElement('#update-description');
  db.collection('blogs').doc(id).onSnapshot((blog) => {
    const list = blog.data();
    title.value = list.Title;
    description.innerHTML = list.Description
  })
}

//warning for delete an article
const warnContiner = domElement(".warn-container");
domElement(".articles-list").addEventListener('click', (e) => {
  if (!e.target.classList.contains('fa-trash-alt')) return;
  deleteArticle()
  let id = e
          .target
          .parentElement
          .parentElement
          .parentElement
          .getAttribute('data-id');
  warningCard(id)
  articlesList.style.display = 'none';
})

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
}

function warningCard(id) {
  warnContiner.innerHTML =
  `<div class="warn">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Be aware that the action you are going to take is irreversible once it’s done.</p>
      <div id="cfrm-btn">
        <button id="cancel">Cancel</button>
        <button id="confirm"${id}>Delete</button>
      </div>
   </div>
  `;

  domElement("#confirm").addEventListener('click', (e) => {
    e.stopPropagation();
    db
    .collection('blogs')
    .doc(id)
    .delete()
    .then(() => {
      warnContiner.style.display ='none';
      deleteMessage.style.display ='flex';
      deleteMessage.style.color ='#008B8B';
      deleteMessage.innerHTML ='Blog deleted successfully';
      setTimeout(() => {
        deleteMessage.innerHTML = ''
      }, 3000);
    })
    .catch(() => {
      deleteMessage.style.color = '#DF502A'
      deleteMessage.innerHTML = 'Failed to delete the blog';
      setTimeout(() => {
        deleteMessage.innerHTML = ''
      }, 5000);
    })
  })

  domElement("#cancel").addEventListener('click', (e) => {
    e.preventDefault();
    let eventCheck = e.target.parentElement.parentElement.parentElement.parentElement;
    if (!eventCheck.classList.contains('main-content')) {
      warnContiner.style.display ='none';
      table.style.display = 'flex';
    } else {
      warnContiner.style.display ='none';
      articlesList.style.display = 'flex';
    }
  })
}


//display queries page
const queriesBtn = domElement(".queries-menu");
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
const tableBody = domElement("tbody")

tableBody.addEventListener('click', (e) =>{
  if (!e.target.classList.contains('fa-trash')) return;
 
  table.style.display = 'none'
  warnContiner.style.display = 'flex';
  table.style.display = 'none';
  settingContainer.style.display = 'none';

  clearBoard();
  manageUsers(e);
})


//handle users
function manageUsers(e) {
  const userDeleteWarn = document.querySelector('.warn-container');
  const id = e.
              target
              .parentElement
              .parentElement
              .getAttribute('data-id');

  userDeleteWarn.innerHTML =
  `<div class="warn">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Be aware that the action you are going to take is irreversible once it’s done.</p>
      <div id="cfrm-btn">
        <button id="cancel">Cancel</button>
        <button id="confirm"${id}>Delete</button>
      </div>
   </div>
  `;

  domElement("#confirm").addEventListener('click', (e) => {
    e.stopPropagation();
    db.collection('users').doc(id).delete().then(() => {
      userDeleteWarn.style.display ='none';
      deleteMessage.style.display ='flex';
      deleteMessage.style.color ='#008B8B';
      deleteMessage.innerHTML ='User deleted successfully';
      setTimeout(() => {
        deleteMessage.innerHTML = '';
      }, 5000);
    })
    .catch((err) => {
      console.log(err)
      deleteMessage.style.color = '#DF502A'
      deleteMessage.innerHTML = 'Failed to delete the user';
      setTimeout(() => {
        deleteMessage.style.display = 'none'
      }, 3000);
    })
  })

  //cancel the delete user action
  domElement("#cancel").addEventListener('click', (e) => {
    e.preventDefault();
      table.style.display = 'flex';
      userDeleteWarn.style.display = 'none';
  })
}

//Add event listerner to display users table
domElement(".manage-users-menu").addEventListener('click', allUsers)

function allUsers() {
  clearBoard()
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  table.style.display = 'flex';
  settingContainer.style.display = 'none';
  editForm.style.display = 'none';
  addArticleForm.style.display = 'none';
  editArticleForm.style.display = 'none'; 
  queriesContainer.style.display ='none';  
}


//fetch users
function fetchUsers() {
  db
  .collection('users')
  .onSnapshot((users) => users.forEach((user) => {
    let info = user.data();

      const tr = document.createElement('tr')
      const tbody = domElement('tbody')
      tr.setAttribute('data-id', user.id)
      tr.innerHTML = `
      <tr>
              <td>${info.FullName}</td>
              <td>${info.role || 'Regular User'}</td>
              <td>${info.status || 'Active'}</td>
              <td><i class="fas fa-pen"></i></td>
              <td><i class="fas fa-trash"></i></td>  
      </tr>
      `
      tbody.appendChild(tr)
    }))
}

//user settings
const settingContainer = domElement(".users-settings");

domElement(".settings-menu").addEventListener('click', userSetting);
function userSetting() {
  clearBoard()
  if(articlesList.classList.contains('show')) {
    articlesList.classList.remove('show')
  }
  settingContainer.style.display = 'flex';
  table.style.display = 'none';
  queriesContainer.style.display ='none'; 
  editForm.style.display = 'none';
  addArticleForm.style.display = 'none';
  editArticleForm.style.display = 'none';  
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


//function do handle queries data
function handleData(doc) {
  const list = doc.data();
  const queriesPage = document.createElement('div');
  const name = document.createElement('h2');
  const email = document.createElement('h5');
  const content = document.createElement('p');
  const action = document.createElement('section')

  action.innerHTML = `
  <i class="fas fa-reply"></i>
  <i class="far fa-trash-alt"></i>
  `
  name.textContent = list.FullName;
  email.textContent = list.Email;
  content.textContent = list.Message;

  queriesPage.appendChild(name);
  queriesPage.appendChild(email);
  queriesPage.appendChild(content);
  queriesPage.appendChild(action);

  queriesContainer.appendChild(queriesPage) 
}

//view queries from DB
function firebaseQueries() {
  db.collection("queries")
    .get()
    .then((queries) => queries.docs.forEach(query => handleData(query)))
    .catch(error => console.log(error))
}

//save post to database
const blogErr = domElement(".article-error");
function savePost() {
  const articleForm = domElement(".add-new-article");
  articleForm.onsubmit = (e) => {
    e.preventDefault();
    const title = domElement("#title").value;
    const description = domElement("#new-description").value;

    if (title == '' || description == '') {
      blogErr.style.color = '#DF502A'
      blogErr.innerHTML = 'Please fill the form fields';
    } else {
      let user = auth.currentUser;
      db.collection('blogs').add({
        Title:title,
        PublishedAt: new Intl.DateTimeFormat('en-US', { dateStyle:'long'}).format( new Date()),
        Author: user.displayName,
        Description: description
      })
      .then((docRef) => {
        db.collection('blogs').doc(docRef.id).set({
          PostImage: `blogs/images/${title}`
        }, { merge: true })
        articleForm.reset()
        blogErr.style.color = '#008B8B';
        blogErr.innerHTML = 'Blog created';
        setTimeout(() => {
          article.style.didplay = 'none';
        }, 3000);
      })
      .catch((err) =>console.log(err))
    }
  }
}

function uploadBlogImage() {
  domElement(".select-article-image").onchange = (event) => {
    event.preventDefault()
    const title = domElement("#title").value;
    let file = {};
    file = event.target.files[0];
    if (title == '') {
      return 
    } else {
      firebase
      .storage()
      .ref(`blogs/images/${title}`)
      .put(file)
    } 
  }
}

//get all articles from DB
function fetchData() {
  db
  .collection('blogs')
  .onSnapshot((data) => data.forEach((article) => {
    displayArticle(article, article.id)
  }))
}
function displayArticle(post, id) {
  const list = post.data();
  const result = document.createElement('div');
  result.setAttribute('data-id', id)
  result.innerHTML = `
  <div >
        <div class="card-content">
            <h3>${list.Title}</h3>
            <div class="article-body">
              <p>${list.Description}</p>
            </div>
        </div>
        <div class="actions">
            <i class="fas fa-trash-alt"></i>
            <i class="fas fa-edit"></i>
            <i class="fas fa-info-circle"></i>
        </div>
  </div>
  `
  domElement(".articles-list").appendChild(result)
}


//function to get totol number of records in a collection
function getLength(collName, dataHolder, keyword) {
   db.collection(collName).onSnapshot((data) => {
    return  dataHolder.innerHTML =  `${data.size} ${keyword}`;
  })
} 


//function to append total number of articles to dashboard
function totalArticles() {
  const articleNumber = domElement('#article-number');
   return `${getLength('blogs',articleNumber, 'Articles')}`;
};


//function to append total number of messages to dashboard
function totalMessages() {
  const messageNmbr = domElement('#inquiry-number');
  const topSide = domElement('#message-notification');
   `${getLength('queries', messageNmbr, 'Queries')}`;
   `${getLength('queries', topSide, '')}`;
};

window.onload = () => {
  fetchData()
  fetchUsers()
  firebaseQueries() 
  totalArticles()
  totalMessages()
}
