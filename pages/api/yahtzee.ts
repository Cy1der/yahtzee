import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";
import { parse } from "query-string";
import validateDice from "../../functions/validateDice";

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

  let rawDice: string = parsed.dice.toString();

  let validate = validateDice(rawDice);

  if (validate.status === 200) {
    let result = 0;
    let count = 0;
    let prev = 0;

    validate.dice.forEach((die) => {
      if (prev === 0 ? die : prev === die) {
        count++;
      }
      prev = die;
    });

    if (count === 5) result = 50;

    return res.status(validate.status).json({ result });
  }

  return res.status(validate.status).json({ result: validate.message });
}
