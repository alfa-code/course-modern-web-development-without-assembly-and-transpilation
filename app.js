import { Dashboard } from "./components/Dashboard.js";

// Монтируем Dashboard в #app
preactRender(
    html`<${Dashboard} />`,
    document.getElementById("app")
);
