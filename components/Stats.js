import { useState, useEffect } from "https://esm.sh/preact@10.19.3/hooks";

/** @returns {import("preact").VNode} */
export function Stats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/stats");
            const data = await res.json();
            setStats(data);
        }
        load();
    }, []);

    return html`
        <div class="card">
            <h3>📈 Статистика</h3>

            ${stats
            ? html`
                    <ul>
                        <li>Uptime: ${stats.uptime.toFixed(1)} сек</li>
                        <li>Memory: ${Math.round(stats.memory / 1024 / 1024)} МБ</li>
                        <li>Online: ${stats.clientsOnline} человек</li>
                    </ul>
                  `
            : "Загрузка..."
        }
        </div>
    `;
}
