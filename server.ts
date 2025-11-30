import http from "node:http";

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Hello from TypeScript server!");
        return;
    }

    if (req.url === "/api/time") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ timestamp: Date.now() }));
        return;
    }

    res.writeHead(404);
    res.end("Not found");
});

server.listen(3000, () => {
    console.log("TS server running at http://localhost:3000");
});
