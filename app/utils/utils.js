export function formatTimestamp(ts) {
    const date = new Date(ts);
    return date.toLocaleString("ru-RU");
}

export function randomInt(max = 100) {
    return Math.floor(Math.random() * max);
}
