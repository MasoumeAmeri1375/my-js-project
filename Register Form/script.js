const registerForm = document.getElementById('register-form');
const messageDiv = document.getElementById('message');

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // اعتبارسنجی ساده
  if(name === '' || email === '' || password === '' || confirmPassword === '') {
    showMessage('Please fill in all fields', false);
    return;
  }

  if(!validateEmail(email)) {
    showMessage('Please enter a valid email', false);
    return;
  }

  if(password.length < 6) {
    showMessage('Password must be at least 6 characters', false);
    return;
  }

  if(password !== confirmPassword) {
    showMessage('Passwords do not match', false);
    return;
  }

  showMessage('Registration successful! ✅', true);
  registerForm.reset();
});

// نمایش پیام
function showMessage(msg, success) {
  messageDiv.textContent = msg;
  messageDiv.style.backgroundColor = success ? '#28a745' : '#dc3545';
}

// اعتبارسنجی ایمیل
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
