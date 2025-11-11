const cards = document.querySelectorAll('.team-card');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');

const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalDesc = document.getElementById('modalDesc');

cards.forEach(card => {
  card.addEventListener('click', () => {
    modalImg.src = card.dataset.img;
    modalName.textContent = card.dataset.name;
    modalRole.textContent = card.dataset.role;
    modalDesc.textContent = card.dataset.desc;
    modal.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => {
  if(e.target === modal) modal.classList.add('hidden');
});
