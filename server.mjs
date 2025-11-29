import http from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, stat } from "node:fs";
import { statSync } from "node:fs";
import path from "node:path";

function serveStatic(req, res) {
    const filePath = path.join(process.cwd(), req.url);

    try {
        const fileStat = statSync(filePath);

        if (fileStat.isFile()) {
            // определяем тип содержимого
            const ext = path.extname(filePath);

            const types = {
                ".js": "text/javascript",
                ".css": "text/css",
                ".html": "text/html",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".svg": "image/svg+xml",
            };

            res.setHeader("Content-Type", types[ext] || "application/octet-stream");

            createReadStream(filePath).pipe(res);
            return true; // файл найден и отправлен
        }
    } catch (err) {
        return false; // файла нет
    }

    return false;
}

const server = http.createServer(async (req, res) => {
    if (serveStatic(req, res)) {
        return;
    }

    if (req.url === "/") {
        const html = await readFile("./index.html", "utf8");
        res.setHeader("Content-Type", "text/html");
        res.end(html);
        return;
    }

    if (req.url === "/api/time") {
        res.setHeader("Content-Type", "application/json");

        const data = {
            timestamp: Date.now(),
        };

        res.end(JSON.stringify(data));
        return;
    }

    if (req.url === "/api/random") {
        res.setHeader("Content-Type", "application/json");

        const num = Math.floor(Math.random() * 100);

        res.end(JSON.stringify({ value: num }));
        return;
    }

    if (req.url === "/api/echo" && req.method === "POST") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ you_sent: body }));
        });

        return;
    }

    const url = new URL(req.url, "http://localhost");

    if (url.pathname === "/api/sum") {
        const a = Number(url.searchParams.get("a"));
        const b = Number(url.searchParams.get("b"));

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ result: a + b }));
        return;
    }

    // API будем добавлять здесь!

    res.writeHead(404);
    res.end("Not found");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

