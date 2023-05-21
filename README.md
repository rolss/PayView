# PayView
Model webpage for transaction services using the MERN Stack (MongoDB, Express.js, React and Node.js). 

## Install dependencies ✅
Some dependencies are not included into the repository in order to reduce noise

At PayView/backend, run the following commands 
* npm install
* npm install nodemon
* npm install dotenv

At PayView/frontend, run the following commands
* npm install
* npm install nodemon

## Run the code 🏃‍♂️
First run the server (backend). In this case, its necessary to run three servers that are acting as individual microservices.

Do the following in three different terminals
At .../userbackend, .../querybackend and ../transactionbackend run the command
* npm run dev

Now, run the react app (frontend).

At .../frontend, run
* npm start

## How it works 💡
Three microservices are being run in the background focused on three different services: user authentication, querying of data and generating transactions. These are run on localhost:4000, localhost:4001 and localhost:4002 respectively. 

A user can sign up and/or log into the website, his password will be secured via hashing and his information will be secured via JWT. For a user that is logged in, there are two main things that they can do.
1. Querying user and card data. On the "view" page, a user will be able to get the balance of a specific credit card by typing in the card information. At the same time, a user is able to see their transaction history, which automatically loads on the same page.
2. Generating a new transaction. On the "transaction" page, a user will be able to create a new transaction by filling in all of their data, including a valid card. The amount of the transaction entered will be deducted from the credit card's balance. A user may also pay with debit card, in which case he will have the option to be redirected to a third party application where the user may proceed. 
Note: debit card payments are CURRENTLY not added to transaction history, because there is no way to check if the transaction actually went through.

## Notes 📝
This project is still in development and there are several functionalities and validations that are yet to be added.
