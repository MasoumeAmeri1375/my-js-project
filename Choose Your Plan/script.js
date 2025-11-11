const cards = document.querySelectorAll('.card');
const billingToggle = document.getElementById('billingToggle');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const planTitle = document.getElementById('planTitle');
const planPrice = document.getElementById('planPrice');
const paymentForm = document.getElementById('paymentForm');

let yearly = false;

// Toggle billing type
billingToggle.addEventListener('change', () => {
  yearly = billingToggle.checked;
  cards.forEach(card => {
    const price = yearly ? card.dataset.year : card.dataset.month;
    const suffix = yearly ? '/year' : '/month';
    card.querySelector('.price').innerHTML = `$${price} <span>${suffix}</span>`;
  });
});

// Card click
cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const plan = card.dataset.plan;
    const price = yearly ? card.dataset.year : card.dataset.month;
    const suffix = yearly ? 'per year' : 'per month';

    planTitle.textContent = `${plan} Plan`;
    planPrice.textContent = `$${price} ${suffix}`;
    modal.classList.remove('hidden');
  });
});

// Close modal
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// Payment form
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Payment successful! Thank you for subscribing.');
  modal.classList.add('hidden');
  paymentForm.reset();
});
