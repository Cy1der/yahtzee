import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";
import { parse } from "query-string";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

type Data = {
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const parsed = parse(url.search);
  let missing = {
    name: "",
  };
  const data: string = parsed.data?.toString().replace(/\\/g, "") ?? "{}";
  const parsedDataString = JSON.parse(data);
  const requiredParams = [
    "aces",
    "twos",
    "threes",
    "fours",
    "fives",
    "sixes",
    "threeOfAKind",
    "fourOfAKind",
    "fullHouse",
    "smallStraight",
    "largeStraight",
    "yahtzee",
    "chance",
    "upperScore",
    "dice",
    "held",
    "heldVisuals",
    "turn",
    "total",
    "count",
    "claimed",
    "bonus",
  ];

  requiredParams.forEach((param) => {
    if (!parsedDataString[param]) return (missing.name = param);
  });

  if (missing.name !== "")
    return res.status(400).json({
      result: `Error: missing/empty ${missing.name} parameter`,
    });

  return res.status(200).json({ result: "placeholder" });
}

async function prismaDB() {
  await prisma.$connect();
}
