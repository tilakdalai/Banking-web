// Array to store accounts
let accounts = [];

// Bank Account class
class BankAccount {
  constructor(acno, name, type, moneyDeposit) {
    this.acno = acno;
    this.name = name;
    this.type = type.toUpperCase();
    this.moneyDeposit = moneyDeposit;
  }

  displayAccount() {
    return `
      Account No.: ${this.acno}<br>
      Name: ${this.name}<br>
      Type: ${this.type}<br>
      Balance: ${this.moneyDeposit}<br>
    `;
  }

  deposit(amount) {
    this.moneyDeposit += amount;
    return this.moneyDeposit;
  }

  withdraw(amount) {
    if (amount > this.moneyDeposit) {
      return "Insufficient balance!";
    }
    this.moneyDeposit -= amount;
    return this.moneyDeposit;
  }
}

// Helper Functions
function findAccount(acno) {
  return accounts.find((acc) => acc.acno === parseInt(acno));
}

// Create Account Handler
function createAccountHandler() {
  const acno = parseInt(document.getElementById("acno").value);
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const moneyDeposit = parseFloat(document.getElementById("moneyDeposit").value);

  if (!acno || !name || !type || isNaN(moneyDeposit)) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (findAccount(acno)) {
    alert("Account number already exists!");
    return;
  }

  const account = new BankAccount(acno, name, type, moneyDeposit);
  accounts.push(account);
  alert("Account created successfully!");
  clearInputs(["acno", "name", "type", "moneyDeposit"]);
}

// Deposit Money Handler
function depositMoneyHandler() {
  const acno = parseInt(document.getElementById("depositAcno").value);
  const amount = parseFloat(document.getElementById("depositAmount").value);

  if (!acno || isNaN(amount) || amount <= 0) {
    alert("Invalid input!");
    return;
  }

  const account = findAccount(acno);
  if (account) {
    account.deposit(amount);
    alert("Deposit successful!");
    displayAccountDetails(account);
    clearInputs(["depositAcno", "depositAmount"]);
  } else {
    alert("Account not found!");
  }
}

// Withdraw Money Handler
function withdrawMoneyHandler() {
  const acno = parseInt(document.getElementById("withdrawAcno").value);
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

  if (!acno || isNaN(amount) || amount <= 0) {
    alert("Invalid input!");
    return;
  }

  const account = findAccount(acno);
  if (account) {
    const result = account.withdraw(amount);
    if (result === "Insufficient balance!") {
      alert(result);
    } else {
      alert("Withdrawal successful!");
      displayAccountDetails(account);
    }
    clearInputs(["withdrawAcno", "withdrawAmount"]);
  } else {
    alert("Account not found!");
  }
}

// Display All Accounts Handler
function displayAllAccounts() {
  const output = document.getElementById("output");
  if (accounts.length === 0) {
    output.innerHTML = "No accounts available!";
  } else {
    output.innerHTML = accounts
      .map((acc) => `<div>${acc.displayAccount()}</div><hr>`)
      .join("");
  }
}

// Delete Account Handler
function deleteAccountHandler() {
  const acno = parseInt(document.getElementById("deleteAcno").value);

  if (!acno) {
    alert("Invalid account number!");
    return;
  }

  const index = accounts.findIndex((acc) => acc.acno === acno);
  if (index !== -1) {
    accounts.splice(index, 1);
    alert("Account deleted successfully!");
    clearInputs(["deleteAcno"]);
  } else {
    alert("Account not found!");
  }
}

// Utility Functions
function clearInputs(ids) {
  ids.forEach((id) => {
    document.getElementById(id).value = "";
  });
}

function displayAccountDetails(account) {
  const output = document.getElementById("output");
  output.innerHTML = `<div>${account.displayAccount()}</div>`;
}

// Show Section
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}
// Function to handle default background and show "Create Account"
function BackgroundAndCreateAccount() {
  changeBackgroundImage('img/1st.png'); // Update the path if needed
  showSection('createAccount');
}
function BackgroundAndDepositMoney() {
  changeBackgroundImage('img/2nd.png'); // Update the path if needed
  showSection('depositMoney');
}
function BackgroundAndwithdrawMoney() {
  changeBackgroundImage('img/3rd.png'); // Update the path if needed
  showSection('withdrawMoney');
}
function BackgroundAnddeleteAccount() {
  changeBackgroundImage('img/5th.png'); // Update the path if needed
  showSection('deleteAccount');
}
// Function to change the background image
function changeBackgroundImage(imageUrl) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}









