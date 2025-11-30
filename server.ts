import http from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, statSync } from "node:fs";
import path from "node:path";

function serveStatic(req: http.IncomingMessage, res: http.ServerResponse) {
    const filePath = path.join(process.cwd(), req.url || "");

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
    const url = new URL(req.url || "/", "http://localhost");

    // 1️⃣ Стараемся отдать статику
    if (serveStatic(req, res)) return;

    // 2️⃣ Главная страница
    if (url.pathname === "/") {
        const html = await readFile("./index.html", "utf8");
        res.setHeader("Content-Type", "text/html");
        res.end(html);
        return;
    }

    // ---------------------------
    // 3️⃣ НАШЕ DASHBOARD API
    // ---------------------------

    // Текущее серверное время
    if (url.pathname === "/api/time") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ timestamp: Date.now() }));
        return;
    }

    // Случайное число
    if (url.pathname === "/api/random") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ value: Math.floor(Math.random() * 100) }));
        return;
    }

    // Небольшая статистика для dashboard
    if (url.pathname === "/api/stats") {
        const stats = {
            uptime: process.uptime(),
            memory: process.memoryUsage().rss,
            clientsOnline: Math.floor(Math.random() * 20),
        };

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(stats));
        return;
    }

    // 4️⃣ Ничего не найдено
    res.writeHead(404);
    res.end("Not found");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
