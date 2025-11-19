# devops-assignment

This project demonstrates a simple Node.js API connected with a custom GitHub Action.  
The Action calls the API, takes the response, and automatically updates this README file  
with the latest status from the API.

## API Status

<!-- API_STATUS_START -->
## API Status - Status: ok - Service: devops-assignment - Timestamp: 2025-11-19T17:13:04.022Z
<!-- API_STATUS_END -->

## How to run locally
1. Install dependencies: `npm install`
2. Start the API: `npm start`
3. Open [View API status locally](http://localhost:3000/status) to see the API response.

## How the workflow works

The workflow is defined in `.github/workflows/call-api.yml`.  
It can be triggered manually from the "Actions" tab on GitHub.

When you run it, the following steps happen:

1. **Checkout repository** – downloads the repository files into the workflow runner (virtual machine).
2. **Set up Node.js** – installs Node.js version 16 so that JavaScript and the API can run.
3. **Install dependencies** – runs `npm install` to download all packages listed in `package.json` (such as `express` and `node-fetch`).
4. **Start the Node.js API** – launches the API on port 3000 in the background and waits a few seconds until it is ready.
5. **Run the custom GitHub Action** – executes the JavaScript file at `.github/actions/call-node-api/index.js`,  
   which sends a request to `http://localhost:3000/status`, reads the response, creates a Markdown summary,  
   and replaces the section between `<!-- API_STATUS_START -->` and `<!-- API_STATUS_END -->` in this README file.
6. **Commit and push the update** – uses the built-in `GITHUB_TOKEN` to commit the new README and push it back to the repository automatically.

The workflow shows how CI/CD automation can connect a Node.js service with GitHub Actions to dynamically update documentation.
