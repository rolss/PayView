# PayView
Model webpage for online transaction services using the MERN Stack (MongoDB, Express.js, React and Node.js), Bootstrap, JWT and a microservice architectural approach. 

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
To run all microservices (backend), do as follows:

At .../userbackend, .../eastquerybackend, .../westernquerybackend, ../easttransactionbackend and ../westerntransactionbackend run the command
* npm start

To run the react app (frontend)

At .../frontend, run
* npm start

## How it works 💡
There are a total of five microservices running.
* userbackend - handles user logins and signups
* eastquerybackend - handles queries for east bank
* westernquerybackend - handles queries for western bank
* easttransactionbackend - handles transactions for east bank
* westerntransactionbackend - handles transactions for western bank

If any of these microservices go offline at any point, the site duly informs the user but keeps working. The website is designed to uphold to a good architectural design that allows for low coupling, high availability and cohesion.

User logins and signups use JWT for safety. Passwords are hashed before getting stored in the MongoDB Database. 

A user starts with no transaction history nor any linked cards. They can choose to do either of the following
* Make a transaction (payment) with a card in the Transaction page. Such card is automatically linked to the user if the transaction is successful. Every transaction creates a receipt that is stored in the database.
* View information about all cards linked to the user as well as the user's transaction history in the View page. A user may add a card to this page without making a transaction by using the helper form.

On every page, click on the question mark icon for help on the current page the user sits on.

## Important note
Everything in this website is fictional, including the banks and the dummy credit card numbers. All transactions and credit cards are stored in the MongoDB database as samples. In a real capacity, the webpage would access a real bank's API with proper authorizations.

Find samples.txt file within the repository to test the website with some sample credit cards 
