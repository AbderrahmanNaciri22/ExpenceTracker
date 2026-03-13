# Expense Tracker API

Backend API for managing personal expenses with authentication and secure user access.

## Overview

Expense Tracker is a backend service that allows users to track and manage their expenses.  
The system provides authentication, protected routes, and CRUD operations for expense management.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Express Middleware

## Features

### Authentication

Users can create an account and log in securely.

**Registration**
- name
- email
- password (hashed with bcrypt)

**Login**
- email
- password

Successful login returns a **JWT token** used to access protected routes.

### Protected Routes

Expense operations require authentication.

Authentication middleware:

- verifies JWT token
- identifies the logged-in user
- blocks unauthorized requests

## Expense Management

Users can manage their personal expenses.

Each expense contains:

- title
- amount
- category
- date
- userId
- createdAt
