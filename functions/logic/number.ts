import validateDice from "../validateDice";

export default function number(number: number, dice: number[]): number {
  let diceStr = dice.join("");
  let validate = validateDice(diceStr);
  if (validate.status === 200) {
    let result = 0;

    validate.dice.forEach((die) => {
      if (die === number) result += number;
    });

    return result;
  }

  return 0;
}
