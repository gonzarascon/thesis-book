import { NumberPropertyValue } from '@notionhq/client/build/src/api-types';
import { promises as fs } from 'fs';
import path from 'path';
import NotionService from '../lib/Notion';

const GenerateAliases = async () => {
  const allPages = await NotionService().getDatabase();

  const parsedObjects = allPages
    .filter((page) => {
      const order = page.properties.Order as NumberPropertyValue;
      return order.number !== 0;
    })
    .map((page) => NotionService().sanitizePage(page));

  await fs.writeFile(
    path.join(process.cwd(), 'data/aliases.json'),
    JSON.stringify({ aliases: parsedObjects || [] })
  );

  await fs.writeFile(
    path.join(process.cwd(), 'data/pages.json'),
    JSON.stringify({ allPages: allPages || [] })
  );
};

GenerateAliases();
