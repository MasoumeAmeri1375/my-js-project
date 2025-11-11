const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const userCard = document.getElementById("userCard");
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const userBio = document.getElementById("userBio");
const reposSpan = document.getElementById("repos");
const followersSpan = document.getElementById("followers");
const followingSpan = document.getElementById("following");
const repoList = document.getElementById("repoList");
const profileLink = document.getElementById("profileLink");
const languageFilter = document.getElementById("languageFilter");
const sortFilter = document.getElementById("sortFilter");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");
const favoritesList = document.getElementById("favoritesList");

let reposData = [];
let filteredRepos = [];
let currentPage = 1;
const perPage = 5;

// Load favorites from LocalStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
function renderFavorites(){
  favoritesList.innerHTML="";
  favorites.forEach(fav=>{
    const li = document.createElement("li");
    li.innerHTML=`<a href="${fav.url}" target="_blank">${fav.name}</a>`;
    favoritesList.appendChild(li);
  });
}
renderFavorites();

// Search user
searchBtn.addEventListener("click", ()=>{
  const username = usernameInput.value.trim();
  if(!username){ alert("Enter a GitHub username"); return; }
  fetchUser(username);
});

async function fetchUser(username){
  try{
    const res = await fetch(`https://api.github.com/users/${username}`);
    if(res.status===404){ alert("User not found"); userCard.classList.add("hidden"); return; }
    const userData = await res.json();
    displayUser(userData);

    const repoRes = await fetch(userData.repos_url+"?per_page=100");
    reposData = await repoRes.json();
    populateLanguages();
    filterAndRender();
    saveFavorite(userData);
  }catch(err){ console.error(err); alert("Error fetching data"); }
}

// Display user profile
function displayUser(user){
  userAvatar.src = user.avatar_url;
  userName.textContent = user.name || user.login;
  userBio.textContent = user.bio || "No bio available";
  reposSpan.textContent = `Repos: ${user.public_repos}`;
  followersSpan.textContent = `Followers: ${user.followers}`;
  followingSpan.textContent = `Following: ${user.following}`;
  profileLink.href = user.html_url;
  userCard.classList.remove("hidden");
}

// Save to favorites
function saveFavorite(user){
  if(!favorites.some(f=>f.name===user.login)){
    favorites.push({name:user.login,url:user.html_url});
    localStorage.setItem("favorites",JSON.stringify(favorites));
    renderFavorites();
  }
}

// Populate language filter
function populateLanguages(){
  const langs = [...new Set(reposData.map(r=>r.language).filter(Boolean))];
  languageFilter.innerHTML='<option value="">All</option>';
  langs.forEach(l=>{
    const opt=document.createElement("option"); opt.value=l; opt.textContent=l;
    languageFilter.appendChild(opt);
  });
}

// Filter & render
function filterAndRender(){
  const lang = languageFilter.value;
  const sortBy = sortFilter.value;
  filteredRepos = lang ? reposData.filter(r=>r.language===lang) : [...reposData];
  if(sortBy==="stars") filteredRepos.sort((a,b)=>b.stargazers_count-a.stargazers_count);
  else filteredRepos.sort((a,b)=>new Date(b[sortBy])-new Date(a[sortBy]));
  currentPage=1;
  renderRepos();
}

languageFilter.addEventListener("change", filterAndRender);
sortFilter.addEventListener("change", filterAndRender);

// Render repos with pagination
function renderRepos(){
  repoList.innerHTML="";
  const start = (currentPage-1)*perPage;
  const pageItems = filteredRepos.slice(start,start+perPage);
  pageItems.forEach(r=>{
    const li = document.createElement("li");
    li.innerHTML=`<a href="${r.html_url}" target="_blank">${r.name}</a> (${r.language||'N/A'}) ⭐${r.stargazers_count} 🍴${r.forks_count} <p>${r.description||''}</p>`;
    repoList.appendChild(li);
  });
  pageNumber.textContent=currentPage;
  prevPage.disabled=currentPage===1;
  nextPage.disabled=start+perPage>=filteredRepos.length;
}

prevPage.addEventListener("click", ()=>{ if(currentPage>1){ currentPage--; renderRepos(); } });
nextPage.addEventListener("click", ()=>{ if(currentPage*perPage<filteredRepos.length){ currentPage++; renderRepos(); } });
