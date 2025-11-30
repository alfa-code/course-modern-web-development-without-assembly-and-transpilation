import http, { IncomingMessage, ServerResponse } from "node:http";
import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { readFile } from "node:fs/promises";

function serveStatic(req: IncomingMessage, res: ServerResponse): boolean {
    const url = req.url || "/";
    const filePath = path.join(process.cwd(), url);

    try {
        const fileStat = statSync(filePath);
        if (fileStat.isFile()) {
            const ext = path.extname(filePath);

            const types: Record<string, string> = {
                ".js": "text/javascript",
                ".css": "text/css",
                ".html": "text/html",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".svg": "image/svg+xml",
            };

            res.setHeader("Content-Type", types[ext] || "application/octet-stream");
            createReadStream(filePath).pipe(res);
            return true;
        }
    } catch {
        return false;
    }

    return false;
}

const server = http.createServer(async (req, res) => {
    if (serveStatic(req, res)) return;

    const url = new URL(req.url || "/", "http://localhost");

    if (url.pathname === "/") {
        const html = await readFile("./index.html", "utf8");
        res.setHeader("Content-Type", "text/html");
        res.end(html);
        return;
    }

    if (url.pathname === "/api/time") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ timestamp: Date.now() }));
        return;
    }

    if (url.pathname === "/api/random") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ value: Math.floor(Math.random() * 100) }));
        return;
    }

    if (url.pathname === "/api/echo" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ you_sent: body }));
        });
        return;
    }

    if (url.pathname === "/api/sum") {
        const a = Number(url.searchParams.get("a"));
        const b = Number(url.searchParams.get("b"));

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ result: a + b }));
        return;
    }

    res.writeHead(404);
    res.end("Not found");
});

server.listen(3000, () => {
    console.log("TS server running at http://localhost:3000");
});
