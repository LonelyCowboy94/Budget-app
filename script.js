/*TODO: import languages*/

/*TODO: import currencies*/

/*TODO: import search function*/

// Fields DOM
const header = document.getElementById("header");
const title = document.getElementById("title");
const navBar = document.getElementById("navBar")
const search = document.getElementById("search");
const welcomeScreen = document.getElementById("welcomeScreen");
const myFinances = document.getElementById("myFinances");
const addIncome = document.getElementById("addIncome");
const addExpense = document.getElementById("addExpense");
const expensePreview = document.getElementById("expensePreview");
const myFinancesContent = document.getElementById("myFinancesContent");
const income = document.getElementById("income")


// Buttons DOM
const homeBtn = document.getElementById("homeBtn");
const settingsBtn = document.getElementById("settingsBtn");
const resetAppBtn = document.getElementById("resetAppBtn");
const currencyBtn = document.getElementById("currencyBtn");
const languageBtn = document.getElementById("languageBtn");
const searchBtn = document.getElementById("searchBtn");
const myFinancesBtn = document.getElementById("myFinancesBtn");
const getStartedBtn = document.getElementById("getStartedBtn");
const overviewBtn = document.getElementById("overviewBtn");
const addIncomeBtn = document.getElementById("addIncomeBtn");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const financesButtons = document.getElementById("financesButtons");
const saveBtn = document.getElementById("saveBtn");


settingsBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Sprečava zatvaranje odmah nakon klika
    document.querySelector(".dropdown-content").classList.toggle("show");
  });

  // Zatvaranje dropdowna ako klikneš van njega
  window.addEventListener("click", function () {
    document.querySelector(".dropdown-content").classList.remove("show");
  });


// Inputs DOM
const searchInputField = document.getElementById("searchInputField");
const addIncomeInputField = document.getElementById("addIncomeInputField");
const addExpenseInputField = document.getElementById("addExpenseInputField");
const addExpenseAmountInputField = document.getElementById("addExpenseAmountInputField");


// Navigation functions
const home = () => {
    financesButtons.style.display = "none";
    addExpense.style.display = "none";
    addIncome.style.display = "none";
    welcomeScreen.style.display = "flex";
    expensePreview.style.display = "none";
    navBar.style.display = "none";
    title.style.display = "flex";
    myFinancesContent.style.display = "none";
    myFinances.style.display = "none";
}

const MyFinances = () => {
    welcomeScreen.style.display = "none";
    financesButtons.style.display = "flex";
    title.style.display = "none";
    navBar.style.display = "flex";
    myFinancesContent.style.display = "none";
    myFinances.style.display = "flex";
}

const AddIncome = () => {
    addExpense.style.display = "none";
    addIncome.style.display = "flex";
    title.style.display = "none";
    search.style.display = "none";
    navBar.style.display = "flex";
    myFinancesContent.style.display = "none";
    
}

const AddExpense = () => {
    addIncome.style.display = "none";
    addExpense.style.display = "flex";
    title.style.display = "none";
    search.style.display = "none";
    navBar.style.display = "flex";
    myFinancesContent.style.display = "none";
    
}

const ExpensePreview = () => {
    addIncome.style.display = "none";
    addExpense.style.display = "none";
    expensePreview.style.display = "none";
    title.style.display = "none";
    search.style.display = "flex";
    navBar.style.display = "none";
    myFinancesContent.style.display = "flex";
}

let financialData = {
    income: 0,
    expenses: {}
};

let budgetHistory = [];

function formatNumber(num) {
    if (num === undefined || num === null) {
        return "0"; // Ovde je problem sa 0 ili bez 0
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const resetApp = () => {
    financialData = {
        income: 0,
        expenses: {}
    };
    
    addIncomeInputField.value = "";
    addExpenseInputField.value = "";
    addExpenseAmountInputField.value = "";

    expensePreview.innerHTML = ""; 
    income.textContent = "0"; 

    welcomeScreen.style.display = "flex";
    navBar.style.display = "none";
    title.style.display = "flex";
    financesButtons.style.display = "none";
    addIncome.style.display = "none";
    addExpense.style.display = "none";
    expensePreview.style.display = "none";

    updateExpenseDisplay(""); 
    localStorage.removeItem("financialData"); 
    location.reload();
};



const resetAppClick = () => {
    document.querySelector(".dropdown-content").innerHTML = "<a href=\"#\" id=\"yes\">Yes</a><a href=\"#\" id=\"no\">No</a>";

    document.querySelector(".dropdown-content").addEventListener("click", function (event) {
        event.stopPropagation(); // Sprečava zatvaranje kada klikneš unutar dropdown-a
    });

    // Dodaj event listener za 'Yes' i 'No' opcije
    document.getElementById("yes").addEventListener("click", function() {
        // Akcija kada se klikne 'Yes'
        resetApp();
        // Ovde dodaj kod za akciju koju želiš kad klikneš Yes
    });

    document.getElementById("no").addEventListener("click", function() {
        // Akcija kada se klikne 'No'
        document.querySelector(".dropdown-content").innerHTML = "<a href=\"#\" id=\"resetAppBtn\">Reset entry</a><a href=\"#\" id=\"currencyBtn\">Currency</a><a href=\"#\" id=\"languageBtn\">Language</a>";

        // Ponovno dodavanje event listener-a za dugme 'Reset App'
        document.getElementById("resetAppBtn").addEventListener("click", resetAppClick);

        // Zatvori meni
        document.querySelector(".dropdown-content").classList.remove("show");
        // Ovde dodaj kod za akciju koju želiš kad klikneš No
    });
    
}

// Inicijalni event listener za dugme 'Reset App'
document.getElementById("resetAppBtn").addEventListener("click", resetAppClick);

// Dodaj event listener za klik van dropdown-a da resetuje meni na početni sadržaj
document.addEventListener("click", function(event) {
    const dropdownContent = document.querySelector(".dropdown-content");
    if (!dropdownContent.contains(event.target)) {
        // Ako klikneš izvan dropdown-a, resetuj njegov sadržaj
        dropdownContent.innerHTML = "<a href=\"#\" id=\"resetAppBtn\">Reset entry</a><a href=\"#\" id=\"currencyBtn\">Currency</a><a href=\"#\" id=\"languageBtn\">Language</a>";
        dropdownContent.classList.remove("show");

        // Ponovno dodavanje event listener-a za dugme 'Reset App'
        document.getElementById("resetAppBtn").addEventListener("click", resetAppClick);
    }
});



const updateExpenseDisplay = (expenseName) => {
    let existingExpense = document.querySelector(`p[data-expense-name="${expenseName}"]`);

    if (existingExpense) {
        let expenseValue = financialData.expenses[expenseName];
        existingExpense.querySelector('span:last-of-type').textContent = formatNumber(expenseValue);
    } else {
        let expenseValue = financialData.expenses[expenseName];
        let newExpense = document.createElement("p");
        newExpense.setAttribute("data-expense-name", expenseName);

        // Kreiramo dugme za brisanje
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.classList.add("delete-expense");
        deleteButton.onclick = () => deleteExpense(expenseName, newExpense);

        // Kreiramo span za naziv
        let newExpenseName = document.createElement("span");
        newExpenseName.textContent = expenseName;

        // Kreiramo span za vrednost
        let newExpenseValue = document.createElement("span");
        newExpenseValue.classList.add("values");
        newExpenseValue.textContent = formatNumber(expenseValue);

        // Dodajemo dugme i span elemente u p element
        newExpense.appendChild(deleteButton);
        newExpense.appendChild(newExpenseName);
        newExpense.appendChild(newExpenseValue);

        // Dodajemo p element u DOM
        expensePreview.insertBefore(newExpense, expensePreview.lastChild);
    }

    calculateSaldo();
    console.log(financialData);
};

const deleteExpense = (expenseName, expenseElement) => {
    if (confirm(`Are you sure you want to delete the expense? ${expenseName}?`)) {
        delete financialData.expenses[expenseName];
        expenseElement.remove();
        calculateSaldo();
    }
};

const displayAllExpenses = () => {
    let expensePreview = document.getElementById('expensePreview');
    let expenseElements = expensePreview.querySelectorAll("p[data-expense-name]");
    
    // Brišemo samo troškove, ne i income
    expenseElements.forEach(expense => expense.remove());

    for (let expenseName in financialData.expenses) {
        let expenseValue = financialData.expenses[expenseName];
        let newExpense = document.createElement("p");
        newExpense.setAttribute("data-expense-name", expenseName);

        // Kreiramo dugme za brisanje
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.classList.add("delete-expense");
        deleteButton.onclick = () => deleteExpense(expenseName, newExpense);

        // Kreiramo span za naziv
        let newExpenseName = document.createElement("span");
        newExpenseName.textContent = expenseName;

        let dotsBetween = document.createElement("span");
        dotsBetween.classList.add("dots");

        // Kreiramo span za vrednost
        let newExpenseValue = document.createElement("span");
        newExpenseValue.classList.add("values");
        newExpenseValue.textContent = formatNumber(expenseValue);

        // Dodajemo dugme, span elemente u p element
        newExpense.appendChild(deleteButton);
        newExpense.appendChild(newExpenseName);
        newExpense.appendChild(dotsBetween);
        newExpense.appendChild(newExpenseValue);

        // Dodajemo p element u DOM
        expensePreview.appendChild(newExpense);
    }
};


const addEBtn = () => {
    expensePreview.style.display = "block";
    
    let expenseValue = Number(addExpenseAmountInputField.value);
    let expenseName = addExpenseInputField.value.trim().charAt(0).toUpperCase() + addExpenseInputField.value.trim().slice(1).toLowerCase();

    // Provera da li je vrednost broj
    if (isNaN(expenseValue) || expenseValue == "") {
        alert("Please enter a valid number for the expense and expense name.");
        addExpenseInputField.value = "";
        addExpenseAmountInputField.value = "";
        return; // Prekida dalji tok funkcije
    }

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
    income.textContent = formatNumber(financialData.income);

    addExpenseInputField.value = "";
    addExpenseAmountInputField.value = "";
    saveFinancialData();
};




const addIBtn = () => {
    expensePreview.style.display = "block";
 
    let incomeValue = Number(addIncomeInputField.value);

    // Provera da li je vrednost broj
    if (isNaN(incomeValue)) {
        alert("Please enter a valid number for the income.");
        addIncomeInputField.value = "";
        return; // Prekida dalji tok funkcije
    }

    // Nadodajemo vrednost na postojeći prihod
    financialData.income += incomeValue;

    // Ažuriramo tekst na ekranu sa novim prihodom
    income.textContent = formatNumber(financialData.income);
    addIncomeInputField.value = "";
   
    calculateSaldo();
    console.log(financialData);
    saveFinancialData();
}







const saveBudget = (budgetName) => {
    if (!budgetName) {
        alert("Please enter a budget name.");
        return;
    }

    // Kopiramo trenutni finansijski objekat i dodajemo ime
    let budgetCopy = {
        name: budgetName,
        data: JSON.parse(JSON.stringify(financialData)) // Duboka kopija objekta
    };

    // Učitavamo prethodne budžete iz localStorage
    let savedBudgets = JSON.parse(localStorage.getItem("budgetHistory")) || [];

    // Dodajemo novi budžet u istoriju
    savedBudgets.push(budgetCopy);

    // Spremamo novu istoriju budžeta u localStorage
    localStorage.setItem("budgetHistory", JSON.stringify(savedBudgets));

    console.log("Budget saved:", budgetCopy);

    // Prikazujemo sve budžete nakon što je novi budžet sačuvan
    displayBudgets();
}

// Event listener za dugme koje dodaje budžet u istoriju
document.getElementById("saveBtn").addEventListener("click", function () {
    let budgetName = prompt("Enter a name for this budget:");
    saveBudget(budgetName);
});












const displayBudgets = () => {
    let savedBudgets = JSON.parse(localStorage.getItem("budgetHistory")) || [];
    let myFinancesContent = document.getElementById('myFinancesContent');
    myFinancesContent.innerHTML = ""; // Brišemo prethodni prikaz

    savedBudgets.forEach((budget, index) => {
        // Glavni kontejner za ceo budžet
        let budgetContainer = document.createElement("div");
        budgetContainer.classList.add("budgetContainer");

        // Kontejner za naslov i dugme za brisanje
        let budgetHeader = document.createElement("div");
        budgetHeader.classList.add("budgetHeader");

        // Naslov budžeta
        let budgetTitle = document.createElement("h2");
        budgetTitle.textContent = `${budget.name.charAt(0).toUpperCase()}${budget.name.slice(1).toLowerCase()}`;

        // Dugme za brisanje
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.classList.add("deleteBudget");
        deleteButton.onclick = () => deleteBudget(index);

        // Dodajemo naslov i dugme za brisanje u header
        budgetHeader.appendChild(budgetTitle);
        budgetHeader.appendChild(deleteButton);

        // Dodajemo header u budgetContainer
        budgetContainer.appendChild(budgetHeader);

        // Kreiranje total income prikaza
        let incomeDisplay = document.createElement("p");
        incomeDisplay.classList.add("incomeHistory");

        let incomeLabel = document.createElement("span");
        incomeLabel.textContent = "Income: ";

        let incomeValue = document.createElement("span");
        incomeValue.classList.add("values");
        incomeValue.textContent = formatNumber(budget.data.income);

        incomeDisplay.appendChild(incomeLabel);
        incomeDisplay.appendChild(incomeValue);
        budgetContainer.appendChild(incomeDisplay);

        // Kontejner za sve troškove
        let budgetDiv = document.createElement("div");
        budgetDiv.classList.add("budgetMonths");

        let totalExpenses = 0; // Sabrani troškovi

        // Dodavanje troškova
        for (let expenseName in budget.data.expenses) {
            let expenseValue = budget.data.expenses[expenseName];
            totalExpenses += expenseValue;

            let newExpense = document.createElement("p");

            let newExpenseName = document.createElement("span");
            newExpenseName.textContent = expenseName;

            let dotsBetween = document.createElement("span");
            dotsBetween.classList.add("dots");

            let newExpenseValue = document.createElement("span");
            newExpenseValue.classList.add("values");
            newExpenseValue.textContent = formatNumber(expenseValue);

            newExpense.appendChild(newExpenseName);
            newExpense.appendChild(dotsBetween);
            newExpense.appendChild(newExpenseValue);
            budgetDiv.appendChild(newExpense);
        }

        budgetContainer.appendChild(budgetDiv);

        // Izračunavanje total sume
        let totalSum = budget.data.income - totalExpenses;

        // Prikaz total sume
        let totalSumDisplay = document.createElement("p");
        totalSumDisplay.classList.add("totalSum");

        let totalSumLabel = document.createElement("span");
        totalSumLabel.textContent = "Total: ";

        let totalSumValue = document.createElement("span");
        totalSumValue.classList.add("totalValues");
        totalSumValue.textContent = formatNumber(totalSum);

        if (totalSum > 0) {
            totalSumValue.classList.add("positive");
        } else {
            totalSumValue.classList.add("negative");
        }

        totalSumDisplay.appendChild(totalSumLabel);
        totalSumDisplay.appendChild(totalSumValue);
        budgetContainer.appendChild(totalSumDisplay);

        // Dodajemo kompletan budgetContainer u myFinancesContent
        myFinancesContent.prepend(budgetContainer);
    });
};

// Funkcija za brisanje budžeta
const deleteBudget = (index) => {
    let savedBudgets = JSON.parse(localStorage.getItem("budgetHistory")) || [];

    if (confirm("Are you sure you want to delete this budget for this month?")) {
        savedBudgets.splice(index, 1); // Uklanja budžet iz niza
        localStorage.setItem("budgetHistory", JSON.stringify(savedBudgets)); // Ažurira localStorage
        displayBudgets(); // Osvežava prikaz
    }
};














function calculateSaldo() {
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
 
         expensePreview.append(totalElement); 
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
}




// Button functions
myFinancesBtn.onclick = MyFinances;

incomeBtn.onclick = AddIncome;

expenseBtn.onclick = function() {
    AddExpense();
}

homeBtn.onclick = home;

overviewBtn.onclick = ExpensePreview;

addExpenseBtn.onclick = addEBtn;

addIncomeBtn.onclick = addIBtn;

resetAppBtn.onclick = resetAppClick;

// Save and load
function saveFinancialData() {
    // Pretvaramo objekat u JSON string i čuvamo ga u localStorage
    localStorage.setItem('financialData', JSON.stringify(financialData));
    console.log("Data has been saved.");
}

// Funkcija koja učitava podatke iz localStorage
function loadFinancialData() {
    // Pokušavamo da učitamo podatke iz localStorage
    const storedData = localStorage.getItem('financialData');
    if (storedData) {
        financialData = JSON.parse(storedData);  // Parsojemo JSON string u objekat
        console.log("Data has been loaded:", financialData);
    } else {
        console.log("No data in localStorage.");
    }
}

// Funkcija za prikazivanje podataka na stranici
function displayFinancialData() {
    const displayDataElement = document.getElementById('displayData');
    if (displayDataElement) {
        // Prikazujemo income i sve expenses stavke
        let dataToDisplay = `Income: ${financialData.income}\nExpenses:\n`;
        for (let expense in financialData.expenses) {
            dataToDisplay += `${expense}: ${financialData.expenses[expense]}\n`;
        }
        displayDataElement.textContent = dataToDisplay;
    } else {
        console.error('Element with id="displayData" was not found!');
    }
}

// Učitavanje podataka i prikazivanje pri učitavanju stranice
window.onload = function() {
    loadFinancialData();  // Učitavamo podatke pri učitavanju stranice
    displayFinancialData();  // Prikazujemo podatke na stranici
    displayAllExpenses();
    displayBudgets();
};


