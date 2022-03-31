export default function straight(dice: number[]) {
    let sortedDice = dice.sort((a: number, b: number) => a - b);
    let counter: number = 1;

    for (let i = 0; i < sortedDice.length; i++) {
        if (sortedDice[i] + 1 === sortedDice[i + 1]) counter++;
    }

    return counter;
}