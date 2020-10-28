const dashBoardContent = domElement(".dashboard-content");
const profilePopup = domElement(".profile-popup");
const editForm = domElement(".edit-admin-profile");
const addArticleForm = domElement(".add-new-article");
const articlesList = domElement(".articles-list");
const editArticleForm = domElement(".update-existing-article");
const deleteMessage = domElement(".delete-message")
const userToken = sessionStorage.getItem('s-techToken')

domElement(".dashboard-menu").addEventListener('click', showDashBoard);
domElement(".fa-ellipsis-v").addEventListener('click', showProfile);
domNodeList(".profile-menu").forEach(icon => icon.addEventListener('click', showUserProfile));
domElement(".edit-profile").addEventListener('click', editProfile);
domElement(".add-post-btn-menu").addEventListener('click', addArticle);
domElement(".view-article-btn").addEventListener('click', viewAllArticles);
domElement(".blog-number-card").addEventListener('click', viewAllArticles);

//server link
const url = 'https://simon-tech-site.herokuapp.com';

//article update form display
let updateImagRef;
const updateArticleFile = domElement('.select-new-image');

updateArticleFile.addEventListener('change', ({ target }) => {
  const { files } = target;
  updateImagRef= files[0]
})

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
    const content = domElement('#update-description').value;
    const updateResult = domElement('.article-edit-error');
    e.preventDefault();

    if (title == '' || content == '') {
      updateResult.style.display = 'flex';
      updateResult.style.color = '#DF502A';
      updateResult.innerHTML = 'Please fill the form fields';
    } else { 
      
      const updatedData = new FormData();
      updatedData.append('title', title);
      updatedData.append('content', content);
      updatedData.append('articleImage', updateImagRef);
  
      fetch(`${url}/articles/${id}`, {
        method: 'PUT',
        headers: {
          'auth-token': userToken
        },
        body: updatedData
      })
      .then(handleResponse)
      .then((result) => {
        if (result.error) {
          updateResult.style.color = 'red'
          updateResult.innerHTML = result.error;
          return false;
        }
        editArticleForm.reset()
        domElement('#update-description').innerHTML= '';
        updateResult.style.color = '#008B8B'
        updateResult.innerHTML = result.message;
        setTimeout(() => {
          editArticleForm.style.display = 'none'
        }, 5000)
      })
      .catch((err) => console.log(err))  
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
  domElement("#name").value = domElement("#admin-name").innerHTML;
  domElement("#bio").value = domElement("#biograph").textContent;
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

  fetch(`${url}/articles/${id}`, {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
    }
  })
  .then(handleResponse)
  .then(result => {
      const articleData = result.signleArticle;
      domElement('#update-title').value= articleData.title;
      domElement('#update-description').innerHTML = articleData.content;
      console.log('update-title', domElement('#update-title'))
  })
  .catch((err) => console.log(err))
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
    fetch(`${url}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': userToken
      }
    })
    .then(handleResponse)
    .then((result) => {
      warnContiner.style.display ='none';
      deleteMessage.style.display ='flex';
      deleteMessage.style.color ='#008B8B';
      deleteMessage.innerHTML = result.message;
      setTimeout(() => {
        deleteMessage.innerHTML = ''
      }, 3000);
    })
    .catch((err) => {
      deleteMessage.style.color = '#DF502A'
      deleteMessage.innerHTML = err
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
      fetch(`${url}/users/info/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'auth-token': userToken
        }
    })
    .then(handleResponse)
    .then((result) => {
      if (result.error) {
        userDeleteWarn.style.display ='none';
        deleteMessage.style.display ='flex';
        deleteMessage.style.color ='red';
        deleteMessage.innerHTML =result.error;
      } else {
        userDeleteWarn.style.display ='none';
        deleteMessage.style.display ='flex';
        deleteMessage.style.color ='#008B8B';
        deleteMessage.innerHTML =result.message;
        setTimeout(() => {
          deleteMessage.innerHTML = '';
        }, 5000);
      }
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
    fetch(`${url}/users/info`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'auth-token': userToken
      }
  })
  .then(handleResponse)
  .then((users) => users.user.forEach((user) => {
      const tr = document.createElement('tr')
      const tbody = domElement('tbody')
      tr.setAttribute('data-id', user._id)
      tr.innerHTML = `
      <tr>
              <td>${user.name}</td>
              <td>${checkRole(user)}</td>
              <td>${checkStatus(user)}</td>
              <td><i class="fas fa-pen"></i></td>
              <td><i class="fas fa-trash"></i></td>  
      </tr>
      `
      tbody.appendChild(tr)
    })
    )
}

function checkRole(user){
  if (user.isAdmin === true){
    return 'Admin'
  } else {
    return 'Regular user'
  }
}
function checkStatus(user){
  if (user.isActive === true){
    return 'Active'
  } else {
    return 'Inactive'
  }
}
// handle fetch response
function handleResponse(response){
  let contentType = response.headers.get('content-type')

  if (contentType.includes('application/json')){
      return response.json()
  } else if (contentType.includes('text/html')) {
      return response.text()
  } else {
      throw new Error(`content-type ${contentType} is not supported`)
  }
};

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

domElement('.setting-card').onsubmit = (e) => {
  e.preventDefault()
  const user = auth.currentUser;
  const emailAddress = user.email;

      auth.sendPasswordResetEmail(emailAddress).then(() => {
        domElement('#reset-erros').style.color = '#008B8B';
        domElement('#reset-erros').innerHTML = 'Email sent!';
        if (domElement('#reset-erros').innerHTML === 'Email sent!') {
          domElement('.setting-card').reset()
          domElement('#reset-erros').innerHTML = 'send'
        } else {
          domElement('#reset-erros').innerHTML = 'Loading .....';
        }
      }).catch((error) => {
        if (error.code === "auth/user-not-found") {
          domElement('#reset-erros').style.color = '#DF502A';
          domElement('#reset-erros').innerHTML = "Email not found!";
        } else {
          domElement('#reset-erros').style.color = '#DF502A';
          domElement('#reset-erros') = "Something went wrong!";
        }
      });
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

function manageQueriesFnc(id){
  console.log(id)
  db.collection('queries').doc(id).delete().then(() => {
    deleteMessage.style.display ='flex';
    deleteMessage.style.color ='#008B8B';
    deleteMessage.innerHTML ='Message deleted successfully';
    setTimeout(() => {
      deleteMessage.innerHTML = '';
      location.reload()
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
}
//function do handle queries data
function handleData(list) {
  const queriesPage = document.createElement('div');
  const name = document.createElement('h2');
  const email = document.createElement('h5');
  const content = document.createElement('p');
  const action = document.createElement('section')
// console.log(id)
  action.innerHTML = `
  <i class="fas fa-reply"></i>
  <i class="far fa-trash-alt" onclick="manageMessages('${list._id}')"></i>
  `
  name.textContent = list.name;
  email.textContent = list.email;
  content.textContent = list.message;

  queriesPage.appendChild(name);
  queriesPage.appendChild(email);
  queriesPage.appendChild(content);
  queriesPage.appendChild(action);

  queriesContainer.appendChild(queriesPage) 
}

//view queries from DB
function fetchMessages() {
    fetch(`${url}/messages`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'auth-token': userToken
        }
    })
    .then(handleResponse)
    .then((queries) => queries.allMessages.forEach(query => handleData(query)))
    .catch(error => console.log(error))
}


// manage messages
function manageMessages(id) {
  console.log(id)
    fetch(`${url}/messages/${id}`, {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json',
          'auth-token': userToken
      }
    })
    .then(handleResponse)
    .then(result => {
      console.log(result.message)
      location.reload()
    })
    .catch((err) => console.log(err))
}


//save post to database
let imagRef;
const blogErr = domElement(".article-error");
const articleFile = domElement(".select-article-image");

articleFile.addEventListener('change', ({ target }) => {
  const { files } = target;
  imagRef = files[0]
})

function savePost() {
  const articleForm = domElement(".add-new-article");
  articleForm.onsubmit = (e) => {
    e.preventDefault();
    const title = domElement("#title").value;
    const content = domElement("#new-description").value;

    if (title == '' || content == '') {
      blogErr.style.color = '#DF502A'
      blogErr.innerHTML = 'Please fill the form fields';
    } else {
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('articleImage', imagRef);

    fetch(`${url}/articles`, {
      method: 'POST',
      headers: {
        'auth-token': userToken
      },
      body: data
    })
    .then(handleResponse)
    .then((result) => {
      if (result.error) {
        blogErr.innerHTML = result.error;
      }
      articleForm.reset()
      blogErr.style.color = '#008B8B';
      blogErr.innerHTML = result.message;
      setTimeout(() => {
        blogErr.innerHTML = '';
        articleForm.style.display = 'none';
      }, 3000);
    })
    .catch((err) => console.log(err))
  }
  }
}

function fetchData() {
  fetch(`${url}/articles`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'auth-token': userToken
    }
  })
  .then(handleResponse)
  .then((articles) => {
    articles.savedArticles.forEach((_article) => {
      const result = document.createElement('div');
      result.setAttribute('data-id', _article._id)
      result.innerHTML = `
      <div >
            <div class="card-content">
                <h3>${_article.title}</h3>
                <div class="article-body">
                  <p>${_article.content}</p>
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
    })
  })
  .catch((err) => console.log(err))
  
}


//function to get totol number of records in a collection
function getLength(modelName, dataHolder, keyword) {
  fetch(`${url}/${modelName}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'auth-token': userToken
    }
  })
  .then(handleResponse)
  .then((data) => {
    const checkDataHoder = modelName === 'articles' ? data.savedArticles.length : modelName === 'messages' ? data.allMessages.length : 0
    return  dataHolder.innerHTML =  `${checkDataHoder} ${keyword}`;
  })
  .catch((err) => console.log(err))
} 


//function to append total number of articles to dashboard
function totalArticles() {
  const articleNumber = domElement('#article-number');
   return `${getLength('articles',articleNumber, 'Articles')}`;
};


//function to append total number of messages to dashboard
function totalMessages() {
  const messageNmbr = domElement('#inquiry-number');
  const topSide = domElement('#message-notification');
   `${getLength('messages', messageNmbr, 'Queries')}`;
   `${getLength('messages', topSide, '')}`;
};

fetchData()
fetchUsers()
fetchMessages() 
totalArticles()
totalMessages()
