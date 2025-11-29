export async function loadTime() {
    const res = await fetch("/api/time");
    const data = await res.json();

    document.getElementById("time").textContent =
        "Серверное время: " + data.timestamp;
}
