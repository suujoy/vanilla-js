const expenseNameInput = document.querySelector(".inp[type='text']");
const amountInput = document.querySelector(".inp[type='number']");
const typeSelect = document.querySelector(".select");
const addButton = document.querySelector(".add");

const middleContainer = document.querySelector(".middle");

const totalIncome = document.querySelector(".inc");
const totalExpense = document.querySelector(".exp");
const balance = document.querySelector(".bal");

let storage = [];
let plus = false;

typeSelect.addEventListener("change", (event) => {
    if (event.target.value === "income") plus = true;
    else plus = false;
});

const renderFunction = () => {
    let sum = "";

    storage.forEach((budget) => {
        sum += `<div id='${budget.id}' class="${budget.type === "Income" ? "income" : "expense"} mid-child">
                <p>${budget.name}</p>
                <div class="right">
                    <div class="amount">${budget.type === "Income" ? "+" : "-"}$${budget.amount}.00</div>
                    <button class="delete">Delete</button>
                </div>
            </div>`;
    });
    middleContainer.innerHTML = sum;
};

const setLocalStorage = () => {
    store = JSON.parse(localStorage.getItem("storeData"));

    storage = store ? store : [];
    renderFunction();
};
setLocalStorage();

const storageFunction = () => {
    let budget = {};

    budget.id = `bg${Date.now()}`;
    if (plus) budget.type = "Income";
    else budget.type = "Expense";
    budget.amount = amountInput.value;
    budget.name = expenseNameInput.value;

    storage.push(budget);
    localStorage.setItem("storeData", JSON.stringify(storage));

    amountInput.value = "";
    expenseNameInput.value = "";
};

const calculationFunction = () => {
    let TIncome = 0;
    let TExpanse = 0;

    storage.forEach((item) => {
        const amount = Number(item.amount);

        if (item.type === "Income") {
            TIncome += amount;
        } else {
            TExpanse += amount;
        }
    });

    totalExpense.textContent = TExpanse;
    totalIncome.textContent = TIncome;
    balance.textContent = TIncome - TExpanse;
};

addButton.addEventListener("click", () => {
    storageFunction();
    renderFunction();
    calculationFunction();
});

let tempStorage = [];
let id = "";
middleContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const clickedId = event.target.closest(".mid-child");
        id = clickedId.id;
        
        tempStorage = storage.filter((item) => item.id !== id);
        storage = tempStorage;
        
        localStorage.setItem("storeData", JSON.stringify(storage));
        calculationFunction()
        renderFunction();
    }
});
