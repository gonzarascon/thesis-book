import { promises as fs } from 'fs';
import path from 'path';
import NotionService from 'lib/Notion';

const GenerateAliases = async () => {
  const allPages = await NotionService().getDatabase();

  const parsedObjects = allPages.map((page) =>
    NotionService().sanitizePage(page)
  );

  await fs.writeFile(
    path.join(process.cwd(), 'data/aliases.json'),
    JSON.stringify({ aliases: parsedObjects || [] })
  );

  return { allPages, parsedObjects };
};

export default GenerateAliases;
