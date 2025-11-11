const form = document.getElementById('contact-form');
const statusMsg = document.getElementById('status');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    statusMsg.textContent = "⚠️ Please fill in all fields.";
    statusMsg.style.color = "#e74c3c";
    return;
  }

  if (!validateEmail(email)) {
    statusMsg.textContent = "❌ Please enter a valid email address.";
    statusMsg.style.color = "#e74c3c";
    return;
  }

  // Simulate successful submission
  statusMsg.textContent = "✅ Message sent successfully!";
  statusMsg.style.color = "#28a745";
  form.reset();

  // Here you could integrate EmailJS or a backend API
  // Example:
  // fetch("/send", { method: "POST", body: JSON.stringify({ name, email, message }) });
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
