# Job Listings App

A simple job listings application that allows users to filter, search, and paginate job listings from a CSV file.

## Table of Contents

- [Prerequisites](#prerequisites)
- [How to Run the Page Locally](#how-to-run-the-page-locally)
- [External Libraries and Frameworks](#external-libraries-and-frameworks)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- A web browser (e.g., Chrome, Firefox)
- A code editor (e.g., Visual Studio Code, Sublime Text)

**Directory Structure**:

```bash
├── css
│   └── styles.css
├── js
│   └── main.js
├── joblistings.csv
├── index.html
└── README.md
```

## How to Run the Page Locally

1. **Clone the Repository**:
   First, clone the repository to your local machine using Git:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Opening HTML File**:
   Open index.html: Open the index.html file in your web browser. You can do this by right-clicking on the file and selecting "Open with" followed by your preferred web browser.

3. **Using Live Server (Optional):**
   If you prefer to use a local server, you can install an extension like "Live Server" in Visual Studio Code. After installing it, right-click on index.html and select "Open with Live Server" for automatic reloading on file changes.

## External Libraries and Frameworks:

This project utilizes the following external libraries:

PapaParse: A powerful CSV parsing library that allows us to read and parse CSV files easily. It is included in the project using a CDN link in the index.html file:

Include it by pasting below link in your index.html file.

```bash
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
```
