import { Client } from "@notionhq/client";
import {
  Page,
  RichTextPropertyValue,
} from "@notionhq/client/build/src/api-types";

const notion = new Client({
  auth: process.env.NOTION_SECTRET,
});

const NotionService = () => {
  const getDatabase = async () => {
    try {
      const res = await notion.databases.query({
        database_id: process.env.NOTION_DB,
      });

      return res.results;
    } catch (err) {
      throw new Error(`Error while trying to fetch database ${err}`);
    }
  };

  const sanitizePage = (page: Page) => {
    const slug = page.properties.Slug as RichTextPropertyValue;

    return {
      id: page.id,
      slug: slug.rich_text[0].plain_text, // Nasty way to access this value.
    };
  };

  const getBlocks = async (block_id: string) => {
    const blocks = await notion.blocks.children.list({
      block_id,
      page_size: 100,
    });

    return blocks.results;
  };

  return {
    getDatabase,
    sanitizePage,
    getBlocks,
  };
};

export default NotionService;
