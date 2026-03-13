# Expense Tracker API

Backend API for managing personal expenses with transaction tracking, filtering, and statistics.

## Overview

Expense Tracker is a backend service that allows users to manage their financial transactions.  
The system provides endpoints to create, update, delete, filter, and analyze expenses.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Middleware architecture
- REST API

## Features

### Transaction Management

Users can manage financial transactions.

Each transaction contains:

- `title`
- `amount`
- `type` (income | expense)
- `category`
- `date`
- `createdAt`

### Validation

A middleware verifies:

- balance constraints
- category validity before inserting a transaction

## Transaction Routes

| Method | Endpoint | Middleware | Description |
|------|------|------|------|
| GET | `/transactions` | — | Get all transactions |
| GET | `/transactions/filter` | — | Filter transactions by type |
| GET | `/transactions/stats` | — | Get statistics about transactions |
| POST | `/transactions` | blanceVerifyAndCategoryCheck | Create transaction |
| PUT | `/transactions/:id` | — | Update transaction |
| DELETE | `/transactions/:id` | — | Delete transaction |

## Route Description

**GET /transactions**

Returns the list of all transactions.

**GET /transactions/filter**

Returns transactions filtered by type (income or expense).

**GET /transactions/stats**

Returns aggregated statistics about transactions.

Examples:
- total income
- total expenses
- balance

**POST /transactions**

Creates a new transaction.

Middleware checks:
- balance rules
- category validity

**PUT /transactions/:id**

Updates an existing transaction.

**DELETE /transactions/:id**

Deletes a transaction.

