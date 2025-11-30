import { Time } from "./Time.js";
import { Random } from "./Random.js";
import { Stats } from "./Stats.js";

/** @returns {import("preact").VNode} */
export function Dashboard() {
    return html`
        <div class="dashboard">
            <h1>📊 Mini Dashboard</h1>

            <div class="widgets">
                <${Time} />
                <${Random} />
                <${Stats} />
            </div>
        </div>
    `;
}
