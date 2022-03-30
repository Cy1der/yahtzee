import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";
import { parse } from "query-string";

type Data = {
  result: string | (number | void)[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const parsed = parse(url.search);

  if (!parsed.held)
    return res.status(400).json({
      result: "Error: missing/empty held parameter",
    });

  let checkForLetters: RegExp = /[a-zA-Z]/g;
  let rawHeld: string = parsed.held.toString();
  let status = 200;
  let message = "";

  if (checkForLetters.test(rawHeld)) { status = 406; message = "Error: invalid held parameter";}

  let held = rawHeld.split("").map((num) => {
    let diceNum = parseInt(num, 10);
    if (isNaN(diceNum) || diceNum > 6 || (diceNum < 1 && diceNum !== 0)) { status = 406; message = "Error: held dice number must be between 1 and 6, or 00000 for no dice held";}
    return diceNum;
  });

  if (status === 200) {
    let result = held;
  
    held.forEach((dice, index) => {
      let diceRoll = Math.floor(Math.random() * 6) + 1;
      if (dice === 0) result.splice(index, 1, diceRoll);
    });

    return res.status(status).json({ result });
  }

  return res.status(status).json({ result: message });
}
