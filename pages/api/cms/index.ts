import type { NextApiRequest, NextApiResponse } from "next";
import NotionService from "lib/Notion";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const allPages = await NotionService().getDatabase();

  res
    .status(200)
    .json(allPages.map((page) => NotionService().sanitizePage(page)));
};
