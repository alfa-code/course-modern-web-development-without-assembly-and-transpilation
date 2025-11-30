import { useState, useEffect } from "https://esm.sh/preact@10.19.3/hooks";

/** @returns {import("preact").VNode} */
export function Random() {
    const [value, setValue] = useState(null);

    async function load() {
        const res = await fetch("/api/random");
        const data = await res.json();
        setValue(data.value);
    }

    return html`
        <div class="card">
            <h3>🎲 Случайное число</h3>
            <p>${value ?? "Нажми кнопку"}</p>
            <button onclick=${load}>Обновить</button>
        </div>
    `;
}
