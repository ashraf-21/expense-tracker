const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');

const incomeForm = document.getElementById('income-form');
const incomeInput = document.getElementById('income-input');

const expenseForm = document.getElementById('expense-form');
const expenseText = document.getElementById('expense-text');
const expenseAmount = document.getElementById('expense-amount');

let income = JSON.parse(localStorage.getItem('income')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

/* ---------- INCOME ---------- */
incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  income = +incomeInput.value;
  localStorage.setItem('income', JSON.stringify(income));
  incomeInput.value = '';
  updateUI();
});

/* ---------- EXPENSE ---------- */
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = +expenseAmount.value;
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (totalExpense + amount > income) {
    alert("You have used up all the income");
    return;
  }

  const expense = {
    id: Date.now(),
    text: expenseText.value,
    amount
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  expenseText.value = '';
  expenseAmount.value = '';

  updateUI();
});

/* ---------- UI FUNCTIONS ---------- */
function updateUI() {
  list.innerHTML = '';

  expenses.forEach(e => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${e.text}
      <span>-₹${e.amount}</span>
      <button onclick="removeExpense(${e.id})">x</button>
    `;
    list.appendChild(li);
  });

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balanceAmount = income - totalExpense;

  balance.innerText = `₹${balanceAmount}`;
  money_plus.innerText = `₹${income}`;
  money_minus.innerText = `₹${totalExpense}`;
}

function removeExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateUI();
}

updateUI();
