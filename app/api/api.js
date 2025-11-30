export async function getTime() {
    const res = await fetch("/api/time");
    return res.json();
}

export async function getRandom() {
    const res = await fetch("/api/random");
    return res.json();
}
