const passwordField = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const generateBtn = document.getElementById('generate');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const syms = "!@#$%^&*()_+{}[]<>?";

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthSlider.value);
  let chars = "";
  if (document.getElementById('uppercase').checked) chars += upper;
  if (document.getElementById('lowercase').checked) chars += lower;
  if (document.getElementById('numbers').checked) chars += nums;
  if (document.getElementById('symbols').checked) chars += syms;

  if (chars === "") {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordField.value = password;
});

copyBtn.addEventListener('click', () => {
  if (passwordField.value === "") return;
  navigator.clipboard.writeText(passwordField.value);
  copyBtn.innerHTML = "<i class='fas fa-check'></i>";
  setTimeout(() => copyBtn.innerHTML = "<i class='fas fa-copy'></i>", 1500);
});
