import http from "node:http";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from Node ESM server!");
});

server.listen(3000, () => {
    console.log("🚀 Сервер запущен: http://localhost:3000");
});
