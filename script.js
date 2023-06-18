const API_key = "d1aee08949bd450f93822aa712267395";
const url = "https://newsapi.org/v2/everything?q="
window.addEventListener("load", () => fetchNews("india"))
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_key}`);
    const data = await res.json()
    bindData(data.articles);
    console.log(data.articles)
}

function bindData(articles){
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardContainer.innerHTML = '';
    articles.forEach(article=>{
        if(!article.urlToImage)return ;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    })
}

function fillData(cardClone,article){
    const newImg = cardClone.querySelector('#news-img')
    newImg.src = article.urlToImage;
    const newTitle = cardClone.querySelector("#news-title")
    newTitle.textContent = article.title;
    const newSource = cardClone.querySelector("#news-source")
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    newSource.textContent = `Source: ${article.source.name}, published: ${date}`
    const newDesc = cardClone.querySelector("#news-desc");
    newDesc.textContent = article.description
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
}

let curSelected = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelected?.classList.remove('active');
    curSelected = navItem;
    curSelected.classList.add("active");
}

const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click",function(){
    const inp = document.querySelector(".news-input")
    if(inp.value){
        fetchNews(inp.value);
        inp.value = ''
    }
})