import { renderTime } from "./ui/time.js";
import { getRandom } from "./api/api.js";
import { mountComponents } from './ui/components.js';

async function bootstrap() {
    renderTime();
    mountComponents();

    const data = await getRandom();
    console.log("Случайное число:", data.value);
}

bootstrap();
