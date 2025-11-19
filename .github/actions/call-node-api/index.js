import fs from "fs";              // Used to read and write files
import fetch from "node-fetch";   // Used to send HTTP requests
import core from "@actions/core"; // Used to get inputs and handle errors in GitHub Actions

async function run() {
  try {
    // Get the API URL from the workflow input
    const apiUrl = core.getInput("api-url");
    console.log(`Calling API at: ${apiUrl}`);

    // Send a GET request to the API
    const response = await fetch(apiUrl);

    // Check if the API response is OK (status 200–299)
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Convert the API response to JSON
    const data = await response.json();
    console.log("API Response:", data);

    // Create a Markdown text with the API data
    const markdown = `## API Status - Status: ${data.status} - Service: ${data.service} - Timestamp: ${data.timestamp}`;
    console.log("Generated Markdown:\n", markdown);

    // Read the current README.md file
    const readmePath = "./README.md";
    let readmeContent = fs.readFileSync(readmePath, "utf8");

    // Define the start and end tags inside the README
    const startTag = "<!-- API_STATUS_START -->";
    const endTag = "<!-- API_STATUS_END -->";

    // Create a new section with the Markdown text between the tags
    const newSection = `${startTag}\n${markdown}\n${endTag}`;

    // Replace the old section with the new one
    // The RegExp finds everything between the two tags and replaces it
    const updatedReadme = readmeContent.replace(
      new RegExp(`${startTag}[\\s\\S]*?${endTag}`),
      newSection
    );

    // Write the updated content back to README.md
    fs.writeFileSync(readmePath, updatedReadme);
    console.log("README.md updated successfully!");

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
