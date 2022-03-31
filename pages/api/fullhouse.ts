import type { NextApiRequest, NextApiResponse } from "next";
import mostFrequent from "../../functions/mostFrequent";
import { URL } from "url";
import { parse } from "query-string";

type Data = {
  result: string | number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const parsed = parse(url.search);

  if (!parsed.dice)
    return res.status(400).json({
      result: "Error: missing/empty dice parameter",
    });

  let checkForLetters: RegExp = /[a-zA-Z]/g;
  let rawDice: string = parsed.dice.toString();
  let status = 200;
  let message = "";

  if (checkForLetters.test(rawDice)) {
    status = 406;
    message = "Error: invalid dice parameter";
  }

  let dice: number[] = rawDice.split("").map((num) => {
    let diceNum = parseInt(num, 10);
    if (isNaN(diceNum) || diceNum > 6 || diceNum < 1) {
      status = 406;
      message = "Error: dice number must be between 1 and 6";
    }
    return diceNum;
  });

  if (validate.status === 200) {
    let filteredDice = mostFrequent(dice);
    let result: number = 0;
    let highest1: number = 0;
    let highest2: number = 0;

    Object.keys(filteredDice).forEach((key) => {
        let count = filteredDice[key];
        
        if (count > highest1) {
            highest2 = highest1;
            highest1 = count;
        }
        else if (count > highest2) {
            highest2 = count;
        }
    });

    if (highest1 === 3 && highest2 === 2) result = 25;

    return res.status(validate.status).json({ result });
  }

  return res.status(validate.status).json({ result: validate.message });
}
