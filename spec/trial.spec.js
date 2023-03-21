const readline = require("readline");
const mockInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

jest.spyOn(readline, "createInterface").mockReturnValue(mockInterface);

const { BankTransaction, BankAccount } = require("../bank");

describe("BankTransaction", () => {
  test("toString returns expected string", () => {
    const transaction = new BankTransaction("21/03/2023", 100, 0, 100);
    expect(transaction.toString()).toBe("21/03/2023 || 100 || 0 || 100");
  });
});

describe("BankAccount", () => {
  let account;

  beforeEach(() => {
    account = new BankAccount("John");
  });

  test("deposit updates account balance and transactions", () => {
    account.deposit(100);
    expect(account.accountBalance).toBe(100);
    expect(account.transactions).toHaveLength(1);
    expect(account.transactions[0]).toBeInstanceOf(BankTransaction);
    expect(account.transactions[0].credit).toBe(100);
    expect(account.transactions[0].debit).toBe("");
    expect(account.transactions[0].balance).toBe(100);
  });

  test("withdraw updates account balance and transactions", () => {
    account.deposit(100);
    account.withdraw(50);
    expect(account.accountBalance).toBe(50);
    expect(account.transactions).toHaveLength(2);
    expect(account.transactions[1]).toBeInstanceOf(BankTransaction);
    expect(account.transactions[1].credit).toBe("");
    expect(account.transactions[1].debit).toBe(50);
    expect(account.transactions[1].balance).toBe(50);
  });

  test('withdraw returns "Insufficient funds" if balance is too low', () => {
    expect(account.withdraw(50)).toBe("Insufficient funds");
    expect(account.accountBalance).toBe(0);
    expect(account.transactions).toHaveLength(0);
  });

  test("printStatement logs all transactions in reverse chronological order", () => {
    const consoleSpy = jest.spyOn(console, "log");
    account.deposit(100);
    account.withdraw(50);
    account.deposit(200);
    account.printStatement();
    expect(consoleSpy).toHaveBeenCalledTimes(4);
    expect(consoleSpy.mock.calls[0][0]).toBe(
      "date || credit || debit || balance"
    );

    expect(console.log.mock.calls[1][0]).toBe(
      `${new Date().toLocaleDateString("en-GB")} || 200 ||  || 250`
    );
    expect(console.log.mock.calls[2][0]).toBe(
      `${new Date().toLocaleDateString("en-GB")} ||  || 50 || 50`
    );
    expect(console.log.mock.calls[3][0]).toBe(
      `${new Date().toLocaleDateString("en-GB")} || 100 ||  || 100`
    );
  });
});
