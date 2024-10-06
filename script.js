let totalAmount = 0;

document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    if (expenseName && !isNaN(expenseAmount)) {
        addExpense(expenseName, expenseAmount);
        this.reset();
    } else {
        alert('Please enter valid expense details.');
    }
});

function addExpense(name, amount) {
    const expensesList = document.getElementById('expenses');
    const li = document.createElement('li');

    li.innerHTML = `
        ${name}: ₹${amount.toFixed(2)} 
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    expensesList.appendChild(li);

    updateTotal(amount);

    li.querySelector('.delete').addEventListener('click', function () {
        deleteExpense(li, amount);
    });

    li.querySelector('.edit').addEventListener('click', function () {
        editExpense(li, name, amount);
    });
}

function updateTotal(amount) {
    totalAmount += amount;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function deleteExpense(li, amount) {
    const expensesList = document.getElementById('expenses');
    expensesList.removeChild(li);
    totalAmount -= amount;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function editExpense(li, name, amount) {
    const newName = prompt("Edit expense name:", name);
    const newAmount = parseFloat(prompt("Edit amount (in ₹):", amount));

    if (newName && !isNaN(newAmount)) {

        li.childNodes[0].textContent = `${newName}: ₹${newAmount.toFixed(2)}`;

        totalAmount += (newAmount - amount);
        document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

        amount = newAmount;
    }
}
