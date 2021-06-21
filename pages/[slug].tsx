import NotionService from 'lib/Notion';
import { GetStaticProps, NextPage } from 'next';
import { render, Block } from '@9gustin/react-notion-render';
import { Page, TitlePropertyValue } from '@notionhq/client/build/src/api-types';
import Breadcrumb from 'components/Breadcrumb';

type IncomingProps = {
  slug: string;
  blockMap: Block[];
  pageData: Page;
};

const IndexPage: NextPage<IncomingProps> = ({ slug, blockMap, pageData }) => {
  console.log(pageData);

  const { properties } = pageData;

  const titleProperty = properties.Page as TitlePropertyValue;

  const pageTitle = titleProperty.title[0].plain_text;

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <Breadcrumb activeRoute={pageTitle} />
      <h2 className="text-4xl font-bold text-gray-700 font-heading">
        {pageTitle}
      </h2>
      <article className="prose prose-lg prose-purple">
        {render(blockMap)}
      </article>
    </section>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  let blockMap = null;
  let pageData = null;

  const { aliases } = await import('data/aliases.json').catch(() => {
    throw new Error(
      "`aliases.json` file not found, please run development server and navigate to '/' in order to create it."
    );
  });

  if (aliases.length) {
    const current = aliases.find((alias) => alias.slug === slug);

    if (current?.id) {
      pageData = await NotionService().getPage(current.id);
      blockMap = await NotionService().getBlocks(current.id);
    }
  }

  return {
    props: {
      slug,
      pageData,
      blockMap,
    },
  };
};

export default IndexPage;
