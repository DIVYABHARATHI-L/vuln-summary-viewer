# Vulnerability Summary Viewer

A web-based application built using **Node.js**, **Express**, **EJS**, and **PostgreSQL** to view and filter cybersecurity vulnerabilities.

## 🔧 Features

- View vulnerabilities with pagination and sorting.
- Filter vulnerabilities based on severity (Critical, High, Medium, Low).
- Clean UI built with HTML, EJS, and external CSS.
- REST API endpoints to fetch and filter vulnerability data.

## 📁 Project Structure
project/
│
├── views/ # EJS templates (home.ejs, index.ejs, etc.)
├── public/
│ └── style/ # CSS files
│ └── style.css
├── db.js # PostgreSQL connection pool
├── index.js # Main Express server
├── .env # Environment variables (not pushed to GitHub)
└── README.md

##📡 API Endpoints

##/vulnerabilities
Get paginated and sorted list of vulnerabilities.

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- sortBy: published_date, severity, or cve_id
- order: asc or desc

##/vulnerabilities/severity?severity=high
Filter vulnerabilities by severity.

##🛠 Tech Stack
- Backend: Node.js, Express
- Database: PostgreSQL
- Templating Engine: EJS
- Styling: CSS



