import { Client } from "@notionhq/client";
import {
  Page,
  RichTextPropertyValue,
} from "@notionhq/client/build/src/api-types";

const notion = new Client({
  auth: process.env.NOTION_SECTRET,
});

//www.notion.so/Database-39adbaad965d4517a5677d3b92cf6afd

//www.notion.so/Getting-Started-d1302c65469740e1a49d28957e39fafa

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

  return {
    getDatabase,
    sanitizePage,
  };
};

export default NotionService;
