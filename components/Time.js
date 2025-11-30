import { useState, useEffect } from "https://esm.sh/preact@10.19.3/hooks";

/** @returns {import("preact").VNode} */
export function Time() {
    const [time, setTime] = useState(null);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/time");
            const data = await res.json();
            setTime(data.timestamp);
        }
        load();
    }, []);

    return html`
        <div class="card">
            <h3>⏱ Время сервера</h3>
            <p>${time || "Загрузка..."}</p>
        </div>
    `;
}
