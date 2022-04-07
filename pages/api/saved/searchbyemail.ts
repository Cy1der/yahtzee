import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

type Data = {
  result: object[] | string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const paramsObject = Object.fromEntries(
    new URLSearchParams(url.search.slice(1))
  );
  let error: string = "";

  if (!paramsObject.email)
    return res
      .status(400)
      .json({ result: `Error: missing/empty email parameter` });

  try {
    const result = await prismaDB(paramsObject.email);
    return res.status(200).json({ result });
  } catch (e) {
    error = e as string;
    return res.status(500).json({ result: error });
  } finally {
    await prisma.$disconnect();
  }
}

async function prismaDB(email: string): Promise<object[] | string> {
  await prisma.$connect();
  const result = await prisma.saves
    .findMany({
      where: {
        email,
      },
    })
    .catch((e) => {
      return e;
    });

  return result;
}
