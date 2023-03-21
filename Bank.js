const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class BankTransaction {
  constructor(date, credit, debit, balance) {
    this.date = date;
    this.credit = credit;
    this.debit = debit;
    this.balance = balance;
  }

  toString() {
    return `${this.date} || ${this.credit} || ${this.debit} || ${this.balance}`;
  }
}

class BankAccount {
  constructor(name) {
    this.accountBalance = 0;
    this.transactions = [];
    this.name = name;
  }

  deposit(amount) {
    this.accountBalance += amount;
    const transaction = new BankTransaction(
      new Date().toLocaleDateString("en-GB"),
      amount,
      "",
      this.accountBalance
    );
    this.transactions.push(transaction);
  }

  withdraw(amount) {
    if (this.accountBalance < amount) {
      return "Insufficient funds";
    } else {
      this.accountBalance -= amount;
      const transaction = new BankTransaction(
        new Date().toLocaleDateString("en-GB"),
        "",
        amount,
        this.accountBalance
      );
      this.transactions.push(transaction);
    }
  }

  printStatement() {
    console.log("date || credit || debit || balance");
    this.transactions.slice().reverse().forEach((transaction) => {
      console.log(transaction.toString());
    });
  }

  visit() {
    const welcomeMessage = `Hi ${this.name}. I hope you're having a lovely day. What brings you to our bank? Please type one of the following:\n1. Deposit\n2. Withdraw\n3. Print Statement\n4. I'm Done\n`;

    const handleResponse = (response) => {
      if (response == "1") {
        rl.question(`How much would you like to deposit?`, (amount) => {
          this.deposit(parseInt(amount));
          rl.question(
            `What else can I do for you? Please type one of the following:\n1. Deposit\n2. Withdraw\n3. Print Statement\n4. I'm Done\n`,
            handleResponse
          );
        });
      } else if (response == "2") {
        rl.question(`How much would you like to withdraw?`, (amount) => {
          this.withdraw(parseInt(amount));
          rl.question(
            `What else can I do for you? Please type one of the following:\n1. Deposit\n2. Withdraw\n3. Print Statement\n4. I'm Done\n`,
            handleResponse
          );
        });
      } else if (response == "3") {
        this.printStatement();
        rl.question(
          `What else can I do for you? Please type one of the following:\n1. Deposit\n2. Withdraw\n3. Print Statement\n4. I'm Done\n`,
          handleResponse
        );
      } else if (response == "4") {
        rl.close();
      } else {
        console.log("Invalid response");
        rl.question(`What else can I do for you? Please type one of the following:\n1. Deposit\n2. Withdraw\n3. Print Statement\n4. I'm Done\n`, handleResponse);
      }
    };

    rl.question(welcomeMessage, handleResponse);
  }
}

const myAccount = new BankAccount("John");
myAccount.visit();

module.exports = { BankTransaction, BankAccount };
