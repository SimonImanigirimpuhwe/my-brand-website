const h2 = document.getElementById("article-title")
const pTime = document.getElementById("published-time")
const articleImag = document.getElementById("article-image")
const articleDcpt = document.getElementById("article-description");
const articleOut = document.getElementById("article-out");
const author = document.getElementById("author");

// server link
const url = 'https://simon-tech-site.herokuapp.com';

async function readArticle() {
    const id = localStorage.getItem('articleId')
    const formatTime = (data) => new Intl.DateTimeFormat('en-US', { dateStyle: 'full'}).format(Date.parse(data))
    fetch(`${url}/articles/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(handleResponse)
    .then(result => {
        const articleData = result.signleArticle;
        const p = document.createElement('p');
        h2.innerHTML = `${articleData.title || ''}`;
        author.innerHTML = ` By ${articleData.author.name}`;
        articleOut.innerHTML = `${formatTime(articleData.postedAt)}`;
        articleImag.innerHTML = `<img src="${articleData.articleImage}">`;
        p.innerHTML = `${articleData.content}`;
        
        articleDcpt.appendChild(p);
        
        // interaction menu
        document.querySelector('.nmbr-comments').innerHTML = articleData.comments;
        document.querySelector('.nmbr-likes').innerHTML = articleData.likes;
        document.querySelector('.nmbr-dislikes').innerHTML = articleData.unlikes;
        document.querySelector('.nmbr-views').innerHTML = articleData.views;
        document.querySelector('.nmbr-shares').innerHTML = articleData.shares; 

    })
    .catch(err => console.log(err))
}

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
