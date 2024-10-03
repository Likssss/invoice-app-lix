# Project Description

A technical challenge submission of the React-based Web App for invoice module feature for applying the position of
Junior Software Engineer at WidaTech.

## Implemented System Requirement

1. Section 1 - Add invoice with autocomplete for product input
    - Mandatory invoice data are date, customer name, salesperson name, notes (optional), and multiple products sold. ✅
    - Autocomplete product suggestions as the user types. Each product suggestion should include product name, product
      picture, stock, and the price of the product (product data can be hard coded in JSON format). ✅
    - POST API called using fetch or axios to save the invoice to database. ✅
    - Form cannot be submitted when at least one of the input boxes are empty. ✅
    - Show a warning message for invalid inputs (label or tooltip). ✅
    - Upon successful submission, proper notification pop-up should be shown. ✅

2. Section 2 - Invoice card
    - An invoice card with pagination to show invoices that have been published. ✅
    - The invoice cards should show summary of the invoice above such as customer name, salesperson name, total amount
      paid, and notes. ✅
    - The invoice data should be queried from backend using GET API using lazy loading method. ✅

3. Section 3 - Time-series graph
    - Show a graph to project revenue from invoices for daily, weekly, and monthly. ✅
    - It should enable user to pan and zoom to specific period. ✅
    - Auto scroll when new data is pushed. ✅

Notes:

- ✅ Requirement has been implemented.
- ⚠️ Requirement partially implemented.
- 🚫 Requirement has not yet been implemented.

## Tech Stack and Used Package

- Frontend:
    - React (UI)
    - Redux (State Management)
    - React Icons
    - React Modal
    - React Toastify
    - Axios (HTTP Request Agent)
    - TailwindCSS (UI Styling)
    - Vite (Module Bundler)

- Backend:
    - Express (Server)
    - Body Parser (HTTP data parser)
    - CORS
    - Sequelize (ORM Database)
    - Mysql2 (Database connector)

## System Limitation

- UI Design very simple

## Installation Instruction

Open terminal and type this command

```bash
$ git clone *github later*
$ cd react-invoice-system
$ npm install
$ cd Frontend
$ npm install
$ cd ..
```

Change some database credential in folder `./backend/config/config.js`. You need to override the `data` variable using
your MySQL/MariaDB credential.

After database credential have been set, make sure you create database in your machine using `data.dbName` variable that
you have set before using this query.

```
CREATE DATABASE your-data.dbName;
```

After it successfully, then open di project directory again and open terminal, then make sure you're in the root of the
project directory, and run this command.

```
$ npm run serve
```

After server already running, open new tab terminal and type this command

```
$ cd frontend
$ npm run dev
```

And then open the local server on your browser to use the System.
