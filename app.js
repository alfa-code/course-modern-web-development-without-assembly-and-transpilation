import { formatTimestamp, randomInt } from "./utils.js";

// Загружаем время с сервера
export async function loadTime() {
    const res = await fetch("/api/time");
    const data = await res.json();

    document.getElementById("time").textContent =
        "Серверное время: " + formatTimestamp(data.timestamp);
}

// Работа второго импорта
function showRandomClientNumber() {
    const p = document.createElement("p");
    p.textContent = "Случайное число на клиенте: " + randomInt(500);
    document.body.appendChild(p);
}

// вызываем функции
loadTime();
showRandomClientNumber();
