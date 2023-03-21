﻿# Bank-Account
 This is a command line bank account where the user can make deposits, withdrawals and print bank statements.
 
# Jest
This is the framework used to test the code. To use it, follow these steps:
- Install Jest from the website
- In the terminal of the project directory, write `npm add jest`  
- In the terminal of the project directory, write `npm install -g jest`
- The jest command will run the tests.

# How it works?
To use the classes, create an instance of the BankAccount class. This account is then used to be an input for the BankTransaction class. For example:
- const account = new BankAccount()
- const transaction = new BankTransaction(account)
