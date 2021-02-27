const commentForm = document.querySelector('.comment-form');
const commentIcon = document.querySelector('#comment-display-btn');
const userToken = sessionStorage.getItem('s-techToken')

const showForm = () => {
    commentForm.style.display = 'flex';
}
commentIcon.addEventListener('click', showForm)

//function to get user location
const locationWrapper = domElement(".user-location");
function scb(data) {
    locationWrapper.style.display = 'block';
    const latitude = document.createElement('p');
    const longitude = document.createElement('p');
    latitude.textContent = `Latitude: ${Math.round(data.coords.latitude)}`;
    longitude.textContent = `Longitude: ${Math.round(data.coords.longitude)}`;

    locationWrapper.appendChild(latitude);
    locationWrapper.appendChild(longitude)
}
function fcb() {
    console.log('Failure')
}
function userLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(scb, fcb)
    } else {
        return false
    }
}


const comment = document.getElementById("comment-area");
const commentResult = document.getElementById("comment-result");
const submitBtn = document.getElementById("submit-comment-form");


const commentsInput = (msg, form) => {
      if (msg.length === 0) {
        comment.style.border = '1px solid red';
        commentResult.style.color = '#DF502A';
        commentResult.innerHTML = 'comment is required!'
        return false;
      } else {
        submitComment(comment.value, form)
      }
}

//function to enable comment submission
async function submitComment(comment, form) {
    const docId = localStorage.getItem('articleId')
    submitBtn.innerHTML = 'Loading ....';

    fetch(`${url}/comments/${docId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'auth-token': userToken
        },
        body: JSON.stringify({
            commentContent: comment
        })
    })
    .then(handleResponse)
    .then((result) => {
        if (result.error) {
            commentResult.style.color = '#DF502A';
            commentResult.innerHTML = result.error;
        } else {
            form.reset();
            submitBtn.innerHTML = 'Submit';
            commentResult.style.color = '#008B8B';
            commentResult.innerHTML = result.message;
            commentForm.style.display = 'none';
            setTimeout(() => {
                commentResult.innerHTML = '';  
            }, 4000);
        }
    })
    .catch((err) => {
        submitBtn.innerHTML = 'Submit';
        commentResult.innerHTML = 'Something went wrong!';
    })
}

submitBtn.onclick = (e) => {
    e.preventDefault();
    commentsInput(comment.value, commentForm)
}

//clear the error on keydown
function clearFeedBack() {
    submitBtn.innerHTML = 'Submit';
    commentResult.innerHTML = '';
}
comment.onkeydown = clearFeedBack;


//fetch comments
function getComments() {
    const docId = localStorage.getItem('articleId');
    fetch(`${url}/comments/${docId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(handleResponse)
    .then(result => result.forEach((comment) => handleCommets(comment)))
    .catch(err => console.log(err))
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


function handleCommets(comment) {
        let divEl = document.createElement('div');
        
        divEl.innerHTML = 
        `<div id="comments-card">
            <div id="user-email">${comment.sender.email}</div>
            <div id="user-comment">${comment.commentContent}</div>
            <div id="user-reaction">
            <div id="user-reaction-icon">
            <i class="fas fa-heart"></i>
            <i class="far fa-thumbs-up"></i>
            </div>
            <div id="reply">
            <p>Reply</p>
            <i class="fas fa-reply"></i>
            </div>
            </div>
        </div>`;

    domElement(".comment-wrapper").appendChild(divEl)
}


window.onload = () => {
    userLocation()
    readArticle()
    getComments()
}