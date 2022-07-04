export const getRandomBetween = (min: number, max: number) => {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}