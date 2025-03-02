// Fields DOM
const header = document.getElementById("header");
const title = document.getElementById("title");
const search = document.getElementById("search");
const welcomeScreen = document.getElementById("welcomeScreen");
const myFinances = document.getElementById("myFinances");
const addIncome = document.getElementById("addIncome");
const addExpense = document.getElementById("addExpense");
const expensePreview = document.getElementById("expensePreview");
const myFinancesContent = document.getElementById("myFinancesContent");
const income = document.getElementById("income")


// Buttons DOM
const searchBtn = document.getElementById("searchBtn");
const myFinancesBtn = document.getElementById("myFinancesBtn");
const getStartedBtn = document.getElementById("getStartedBtn");
const overviewBtn = document.getElementById("overviewBtn");
const addIncomeBtn = document.getElementById("addIncomeBtn");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const financesButtons = document.getElementById("financesButtons");


// Inputs DOM
const searchInputField = document.getElementById("searchInputField");
const addIncomeInputField = document.getElementById("addIncomeInputField");
const addExpenseInputField = document.getElementById("addExpenseInputField");
const addExpenseAmountInputField = document.getElementById("addExpenseAmountInputField");


const monthInfo = [];


// Navigation functions
const home = () => {
    financesButtons.style.display = "none";
    addExpense.style.display = "none";
    addIncome.style.display = "none";
    welcomeScreen.style.display = "flex";
}

const MyFinances = () => {
    welcomeScreen.style.display = "none";
    financesButtons.style.display = "flex";
}

const AddIncome = () => {
    addExpense.style.display = "none";
    addIncome.style.display = "flex";
    title.style.display = "flex";
    search.style.display = "none";
}

const AddExpense = () => {
    addIncome.style.display = "none";
    addExpense.style.display = "flex";
    title.style.display = "flex";
    search.style.display = "none";
}

const ExpensePreview = () => {
    addIncome.style.display = "none";
    addExpense.style.display = "none";
    expensePreview.style.display = "none";
    title.style.display = "none";
    search.style.display = "flex";
}

// Kreiramo objekat za čuvanje troškova
let financialData = {
    income: 0,
    expenses: {}
};

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const updateExpenseDisplay = (expenseName) => {
    // Prvo proveravamo da li već postoji p element sa tim imenom
    let existingExpense = document.querySelector(`p[data-expense-name="${expenseName}"]`);

    if (existingExpense) {
        // Ako postoji, ažuriramo vrednost tog specifičnog troška
        let expenseValue = financialData.expenses[expenseName];
        existingExpense.querySelector('span:last-of-type').textContent = formatNumber(expenseValue);

    } else {
        // Ako ne postoji, kreiramo novi element za trošak
        let expenseValue = financialData.expenses[expenseName];
        let newExpense = document.createElement("p");
        newExpense.setAttribute("data-expense-name", expenseName);

        // Kreiramo span za naziv
        let newExpenseName = document.createElement("span");
        newExpenseName.textContent = expenseName;

        // Kreiramo span za vrednost
        let newExpenseValue = document.createElement("span");
        newExpenseValue.classList.add("values");
        newExpenseValue.textContent = formatNumber(expenseValue);

        // Dodajemo span elemente u p element
        newExpense.appendChild(newExpenseName);
        newExpense.appendChild(newExpenseValue);

        // Dodajemo p element u DOM
        expensePreview.insertBefore(newExpense, expensePreview.lastChild);
    }

    // Računanje ukupnog salda
    let totalIncome = financialData.income || 0;
    let totalExpenses = Object.values(financialData.expenses).reduce((acc, val) => acc + val, 0);
    let totalBalance = totalIncome - totalExpenses;

    // Provera da li već postoji total element
    let existingTotal = document.getElementById("totalBalance");
    
    if (existingTotal) {
        existingTotal.innerHTML = `<h3>Total:</h3><span>${formatNumber(totalBalance)}</span>`;
    } else {
        let totalElement = document.createElement("p");
        totalElement.id = "totalBalance";
        totalElement.innerHTML = `<h3>Total:</h3><span>${formatNumber(totalBalance)}</span>`;

        expensePreview.appendChild(totalElement);
    }

    // Provera da li je totalBalance pozitivan ili negativan
    let totalBalanceSpan = document.querySelector("#totalBalance span");

    // Dodavanje odgovarajuće klase na osnovu vrednosti totalBalance
    if (totalBalance > 0) {
        totalBalanceSpan.classList.add("positive");
        totalBalanceSpan.classList.remove("negative");
    } else if (totalBalance < 0) {
        totalBalanceSpan.classList.add("negative");
        totalBalanceSpan.classList.remove("positive");
    } else {
        // Ako je saldo 0, možemo dodati neku neutralnu klasu, ili samo ostaviti bez klase
        totalBalanceSpan.classList.remove("positive", "negative");
    }

    console.log(financialData);
};



const addEBtn = () => {
    expensePreview.style.display = "block";

    let expenseValue = Number(addExpenseAmountInputField.value);
    let expenseName = addExpenseInputField.value.trim().charAt(0).toUpperCase() + addExpenseInputField.value.trim().slice(1).toLowerCase();

    // Proveravamo da li već postoji ključ za taj trošak u objektu
    if (financialData.expenses[expenseName]) {
        // Ako postoji, nadodajemo vrednost na postojeći trošak
        financialData.expenses[expenseName] += expenseValue;
    } else {
        // Ako ne postoji, kreiramo novi ključ sa početnom vrednošću
        financialData.expenses[expenseName] = expenseValue;
    }

    // Ažuriramo prikaz samo za ovaj trošak
    updateExpenseDisplay(expenseName);

    console.log(financialData);
    addExpenseInputField.value = "";
    addExpenseAmountInputField.value = "";
};



const addIBtn = () => {
    expensePreview.style.display = "block";

    // Preuzimamo unos korisnika i pretvaramo ga u broj
    let incomeValue = Number(addIncomeInputField.value);

    // Nadodajemo vrednost na postojeći prihod
    financialData.income += incomeValue;

    // Ažuriramo tekst na ekranu sa novim prihodom
    income.textContent = formatNumber(financialData.income);
    addIncomeInputField.value = "";
    updateExpenseDisplay()
    console.log(financialData);
}


// Button functions
myFinancesBtn.onclick = MyFinances;

incomeBtn.onclick = AddIncome;

expenseBtn.onclick = AddExpense;

title.onclick = home;

overviewBtn.onclick = ExpensePreview;

addExpenseBtn.onclick = addEBtn;

addIncomeBtn.onclick = addIBtn;




