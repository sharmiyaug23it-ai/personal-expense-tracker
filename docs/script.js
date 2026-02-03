const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

const API_URL = "http://localhost:5000/expenses";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const expense = {
        amount: document.getElementById("amount").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    });

    form.reset();
    loadExpenses();
});

async function loadExpenses() {
    const res = await fetch(API_URL);
    const expenses = await res.json();

    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach(exp => {
        total += exp.amount;

        expenseList.innerHTML += `
            <tr>
                <td>${exp.amount}</td>
                <td>${exp.category}</td>
                <td>${exp.date}</td>
                <td>${exp.description}</td>
                <td>
                    <button onclick="deleteExpense('${exp._id}')">❌</button>
                </td>
            </tr>
        `;
    });

    totalEl.innerText = total;
}

async function deleteExpense(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadExpenses();
}

loadExpenses();
