const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const ctx = document.getElementById('expenseChart').getContext('2d');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let chart;

// اضافه کردن تراکنش
transactionForm.addEventListener('submit', function(e){
  e.preventDefault();
  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if(text !== '' && !isNaN(amount)) {
    transactions.push({ text, amount, category });
    saveTransactions();
    renderTransactions();
    textInput.value = '';
    amountInput.value = '';
  }
});

// ذخیره در localStorage
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// حذف تراکنش
function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveTransactions();
  renderTransactions();
}

// رندر تراکنش‌ها و محاسبه موجودی
function renderTransactions() {
  transactionList.innerHTML = '';

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement('li');
    li.classList.add('transaction-item');
    li.classList.add(t.category);
    li.innerHTML = `
      ${t.text} <span>$${t.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
    `;
    transactionList.appendChild(li);

    if(t.category === 'income') income += t.amount;
    else expense += t.amount;
  });

  const balance = income - expense;
  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${income.toFixed(2)}`;
  expenseEl.textContent = `$${expense.toFixed(2)}`;

  renderChart(income, expense);
}

// رندر نمودار
function renderChart(income, expense) {
  if(chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        label: 'Amount',
        data: [income, expense],
        backgroundColor: ['#28a745', '#dc3545']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

// بارگذاری اولیه
renderTransactions();
