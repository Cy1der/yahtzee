export default function validateDice(
  dice: string
): { status: number; message: string; dice: number[] } {
  let checkForLetters: RegExp = /[a-zA-Z]/g;
  let status = 200;
  let message = "";

  if (checkForLetters.test(dice)) {
    status = 406;
    message = "Error: invalid dice parameter";
  }

  let parsedDice = dice.split("").map((num) => {
    let diceNum = parseInt(num, 10);
    if (isNaN(diceNum) || diceNum > 6 || diceNum < 1) {
      status = 406;
      message = "Error: dice number must be between 1 and 6";
    }
    return diceNum;
  });

  return {
    status,
    message,
    dice: parsedDice,
  };
}
