import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";
import { parse } from "query-string";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const paramsObject = Object.fromEntries(new URLSearchParams(url.search.slice(1)));
  let saveData: any = {};

  Object.entries(paramsObject).forEach(([key, value]) => {
    if (key === "email") return saveData[key] = value;
    return saveData[key] = JSON.parse(value);
  });

  let missing = {
    name: "",
  };
  let error = "";
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
    "email"
  ];
  
  requiredParams.forEach((param) => {
    if (!paramsObject[param]) return (missing.name = param);
  });

  if (missing.name !== "")
    return res.status(400).json({
      result: `Error: missing/empty ${missing.name} parameter`,
    });
    
  let result = await prismaDB(saveData).catch((e) => error = e).finally(() => {
    prisma.$disconnect();
  });
    
  if (error) return res.status(500).json({ result: error });

  return res.status(200).json({ result });
}

async function prismaDB(saveData: any): Promise<string> {
  await prisma.$connect();
  let newData = await prisma.saves.create({
    data: saveData
  });
  return newData.id;
}