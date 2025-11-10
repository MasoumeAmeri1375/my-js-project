const bookmarkForm = document.getElementById('bookmark-form');
const siteNameInput = document.getElementById('site-name');
const siteUrlInput = document.getElementById('site-url');
const bookmarkList = document.getElementById('bookmark-list');

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function saveBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function renderBookmarks() {
  bookmarkList.innerHTML = '';
  bookmarks.forEach((b, index) => {
    const li = document.createElement('li');
    li.classList.add('bookmark-item');
    li.innerHTML = `
      <a href="${b.url}" target="_blank">${b.name}</a>
      <button class="delete-btn" onclick="deleteBookmark(${index})"><i class="fas fa-trash"></i></button>
    `;
    bookmarkList.appendChild(li);
  });
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  saveBookmarks();
  renderBookmarks();
}

bookmarkForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = siteNameInput.value.trim();
  const url = siteUrlInput.value.trim();

  if(name !== '' && url !== '') {
    bookmarks.push({ name, url });
    saveBookmarks();
    renderBookmarks();
    siteNameInput.value = '';
    siteUrlInput.value = '';
  }
});

// بارگذاری اولیه
renderBookmarks();
