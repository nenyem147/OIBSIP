LOGIN AUTHENTICATION SYSTEM

Project Overview
This project is a simple client-side Login Authentication System that allows users to register an account, log 
in with their credentials, access a protected dashboard, and log out.

The application uses Local Storage to save registered user information and manage login sessions. Passwords are 
hashed using the Web Crypto API (PBKDF2 with SHA-256) before being stored.

Tech Stack:
HTML
CSS
JavaScript
Local Storage 
Web Crypto API 

Features
User Registration: Users can create accounts using a username or email and password.
Password Validation: Passwords must contain at least 8 characters and one number.
Duplicate Account Check: Prevents users from registering with an existing username or email.
User Login: Validates registered users' login credentials.
Error Handling: Displays a general error message when login credentials are incorrect.
Password Hashing: Uses PBKDF2 with SHA-256 to hash passwords before storing them.
Protected Dashboard: Only users with a valid login session can access the dashboard.
Logout: Clears the active login session and returns the user to the login page.
Single-Page Interface: Registration, login, and dashboard sections are contained in one HTML file.