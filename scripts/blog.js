const selectedPost = document.querySelector('main');

selectedPost.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('card-content')) return ;

    window.location.href = '../blog/article.html';
});

//display data from DB
function getData() {
    db
    .collection('blogs')
    .onSnapshot((data) => data.forEach((article) => displayPost(article, article.id)))
}

async function displayPost(post, id) {
    const list = post.data();

    const img = await firebase
    .storage()
    .ref(`${(list.PostImage)}`)
    .getDownloadURL()
    .then((imag) => { 
        return imag
    })
    .catch((err) => console.log(err))

    const result = document.createElement('section');

    result.innerHTML = `
    <div class="card-content" data-id="${id}">
            <div class="article-image">
                <img src="${img}">
            </div>
            <div class="article-more">
                <div class="published-time">
                    <span class="iconify" data-inline="false" data-icon="uil:calender"></span>
                    <p class="article-out">${list.PublishedAt}</p>
                </div>
                <div class="article-content-wrapper">
                    <h4 class="article-title">${list.Title}</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nobis eius veniam similique debitis suscipit hic quae deleniti
                    ratione! Nihil, ipsa minus?</p>
                </div>
                <div class="interaction-menu">
                    <div class="reactions">
                        <p class="nmbr-likes">10</p><i class="far fa-thumbs-up"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-shares">5</p><i class="fas fa-share"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-views">10</p><i class="fas fa-eye"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-comments">8</p><i class="far fa-comments"></i>
                    </div>
                    <div class="reactions">
                        <p class="nmbr-dislikes">0</p><i class="far fa-thumbs-down"></i>
                    </div>
                </div>
            </div> 
    </div>
    `
    domElement(".articles-container").appendChild(result)
  }


window.onload = () => {
    getData() 
}