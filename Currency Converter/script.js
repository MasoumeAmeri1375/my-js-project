const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("historyList");

const currencies = ["USD","EUR","GBP","JPY","CAD","AUD","CHF","CNY","INR","TRY"];

// Populate dropdowns
currencies.forEach(cur=>{
  const option1=document.createElement("option");
  option1.value=cur; option1.textContent=cur; fromCurrency.appendChild(option1);
  const option2=document.createElement("option");
  option2.value=cur; option2.textContent=cur; toCurrency.appendChild(option2);
});
fromCurrency.value="USD";
toCurrency.value="EUR";

// Load history
let history = JSON.parse(localStorage.getItem("history")) || [];
function renderHistory(){
  historyList.innerHTML="";
  history.slice(-5).reverse().forEach(h=>{
    const li = document.createElement("li");
    li.textContent=h;
    historyList.appendChild(li);
  });
}
renderHistory();

// Conversion logic (with static rates for demo)
const rates = {
  "USD":1,"EUR":0.95,"GBP":0.82,"JPY":145,"CAD":1.36,"AUD":1.47,"CHF":0.93,"CNY":7.12,"INR":82.5,"TRY":36
};

convertBtn.addEventListener("click",()=>{
  const amount=parseFloat(amountInput.value);
  const from=fromCurrency.value;
  const to=toCurrency.value;
  if(isNaN(amount)){ alert("Enter a valid amount"); return; }
  const converted=(amount/rates[from])*rates[to];
  const resultText=`${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  resultDiv.textContent=resultText;
  history.push(resultText);
  localStorage.setItem("history",JSON.stringify(history));
  renderHistory();
});
