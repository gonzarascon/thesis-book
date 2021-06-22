import { Client } from '@notionhq/client';
import {
  NumberPropertyValue,
  Page,
  RichTextPropertyValue,
  TitlePropertyValue,
} from '@notionhq/client/build/src/api-types';

const notion = new Client({
  auth: process.env.NOTION_SECTRET,
});

const NotionService = () => {
  const getDatabase = async () => {
    try {
      const res = await notion.databases.query({
        database_id: process.env.NOTION_DB,
        sorts:[
          {property:'Order',direction:'ascending'}
        ]
      });

      return res.results;
    } catch (err) {
      throw new Error(`Error while trying to fetch database ${err}`);
    }
  };

  const sanitizePage = (page: Page) => {
    const title =  page.properties.Page as TitlePropertyValue;
    const slug = page.properties.Slug as RichTextPropertyValue;

    console.info(`Sanitizing data for ${title.title[0].plain_text}`)

    return {
      id: page.id,
      slug: slug.rich_text[0].plain_text, // Nasty way to access this value.
      title: title.title[0].plain_text
    };
  };

  const getPage = async (page_id: string) => {
    return await notion.pages.retrieve({
      page_id,
    });
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
    getPage,
  };
};

export default NotionService;
