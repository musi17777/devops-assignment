import http from 'http';

// Create an HTTP server
const server = http.createServer((req, res) => {

    // Check if the request is GET /status
    if (req.url === '/status' && req.method === 'GET') {

        // Data we want to return
        const response = {
            status: "ok",
            service: "devops-assignment",
            timestamp: new Date().toISOString()
        };

        // Set response status and type
        res.writeHead(200, { 'Content-Type': 'application/json' });

        // Send the JSON response
        res.end(JSON.stringify(response));

    } else {
        // If the route does not exist
        res.writeHead(404);
        res.end("Not Found");
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("API running at http://localhost:3000/status");
});
