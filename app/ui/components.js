import { html } from "https://esm.sh/htm/preact";
import { render } from "https://esm.sh/preact";
import { useState } from "https://esm.sh/preact/hooks";

// Небольшой компонент-счётчик
export function Counter() {
    const [count, setCount] = useState(0);

    return html`
        <div style="margin-top: 20px;">
            <button onclick=${() => setCount(count + 1)}>
                Нажми меня: ${count}
            </button>
        </div>
    `;
}

// Точка рендера
export function mountComponents() {
    const container = document.getElementById("components-root");
    render(html`<${Counter} />`, container);
}
