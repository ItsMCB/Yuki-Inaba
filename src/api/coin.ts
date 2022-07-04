import { getRandomBetween } from "./utils/mathUtils";

function flip(): string {
    if (getRandomBetween(0,1) == 0) { return "Heads"; }
    else { return "Tails"; }
}

export { flip }