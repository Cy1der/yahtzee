import type { NextApiRequest, NextApiResponse } from "next";
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

  let dice = rawDice.split("").map((num) => {
    let diceNum = parseInt(num, 10);
    if (isNaN(diceNum) || diceNum > 6 || diceNum < 1) {
      status = 406;
      message = "Error: dice number must be between 1 and 6";
    }
    return diceNum;
  });

  if (status === 200) {
    let result = 0;

    dice.forEach((die) => {
      if (die === 4) result += 4;
    });

    return res.status(status).json({ result });
  }

  return res.status(status).json({ result: message });
}
