const h2 = document.getElementById("article-title")
const pTime = document.getElementById("published-time")
const articleImag = document.getElementById("article-image")
const articleDcpt = document.getElementById("article-description");
const articleOut = document.getElementById("article-out");
const author = document.getElementById("author");

async function readArticle() {
    const id = localStorage.getItem('id')
  db.collection('blogs')
    .doc(id)
    .get()
    .then(async(article) => {
        let list = article.data()

    const img = await firebase
    .storage()
    .ref(`${(list.PostImage)}`)
    .getDownloadURL()
    .then((imag) => { 

        return imag
    })
    .catch((err) => console.log(err))

    const p = document.createElement('p');
    h2.innerHTML = `${list.Title || ''}`;
    author.innerHTML = ` By ${list.Author}`;
    articleOut.innerHTML = `${list.PublishedAt}`;
    articleImag.innerHTML = `<img src="${img}">`;
    p.innerHTML = `${list.Description}`;
    articleDcpt.appendChild(p);
    })
    .catch(err => console.log(err))
}
