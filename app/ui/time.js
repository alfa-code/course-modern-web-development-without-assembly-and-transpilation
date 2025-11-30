import { getTime } from "../api/api.js";

export async function renderTime() {
    const data = await getTime();
    document.getElementById("time").textContent =
        "Серверное время: " + data.timestamp;
}
