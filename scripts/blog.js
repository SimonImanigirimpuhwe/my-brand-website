const selectedPost = document.querySelector('main');
const url = 'https://simon-tech-site.herokuapp.com';

function pageRedirect(articleId){
    localStorage.setItem("articleId", articleId);
    window.location.href = '../blog/article.html';
}

      
async function displayPost(data, id) {
    const result = document.createElement('section');
    const formatTime = (data) => new Intl.DateTimeFormat('en-US', { dateStyle: 'full'}).format(Date.parse(data))
    result.innerHTML = `
    <div class="card-content" data-id="${id}" onclick="pageRedirect('${id}')">
            <div class="article-image">
                <img src="${data.articleImage}">
            </div>
            <div class="article-more">
                <div class="published-time">
                    <span class="iconify" data-inline="false" data-icon="uil:calender"></span>
                    <p class="article-out">${formatTime(data.postedAt)}</p>
                </div>
                <div class="article-content-wrapper">
                    <h4 class="article-title">${data.title}</h4>
                    <p>${data.content.slice(0, 130)} [...]</p>
                </div>
                <div class="interaction-menu">
                    <div class="reactions">
                        <p class="nmbr-likes">${data.likes}</p><i class="far fa-thumbs-up"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-shares">${data.shares}</p><i class="fas fa-share"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-views">${data.views}</p><i class="fas fa-eye"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-comments">${data.comments}</p><i class="far fa-comments"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-dislikes">${data.unlikes}</p><i class="far fa-thumbs-down"></i>
                    </div>
                </div>
            </div> 
    </div>
    `
    domElement(".articles-container").appendChild(result)
};

function fetchData(){
    fetch(`${url}/articles/admin`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(handleResponse)
    .then((result) => {
        domElement('#loading').style.display = 'none';
        result.savedArticles.forEach((article) => displayPost(article, article._id))
    })
    .catch((err) => console.log(err))
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

window.onload = () => {
    fetchData()
}
