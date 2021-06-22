import { Page, TitlePropertyValue } from '@notionhq/client/build/src/api-types';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import cx from 'clsx';
import NotionService from 'lib/Notion';
import { render, Block } from '@9gustin/react-notion-render';
import { ParsedPage } from 'types/ParsedPage';

type IncomingProps = {
  content: Block[];
  pages: Page[];
  parsedURLs: ParsedPage[];
};

const cardClasses = (index: number) =>
  cx(
    'flex items-center p-6 text-2xl transition-all font-heading border-l-4 w-full shadow-lg rounded-sm hover:bg-gray-50',
    {
      'border-purple-500 hover:border-purple-600': index === 0,
    },
    {
      'border-yellow-500 hover:border-yellow-600': index === 1,
    }
  );

const IndexPage: NextPage<IncomingProps> = ({ pages, parsedURLs, content }) => (
  <section className="max-w-2xl mx-auto">
    <article className="prose prose-purple">{render(content)}</article>
    <h3 className="my-8 text-xl text-center text-gray-700 font-heading">
      Contenidos:
    </h3>
    <div className="flex flex-col items-center space-y-4">
      {pages.map((page, index) => {
        const pageProperty = page.properties.Page as TitlePropertyValue;

        return (
          <Link
            href={parsedURLs.find((url) => url.id === page.id)?.slug || '/'}
            key={page.id}
          >
            <a className={cardClasses(index)}>
              <h2 className="text-lg font-heading">
                {pageProperty.title[0].plain_text}
              </h2>
            </a>
          </Link>
        );
      })}
    </div>
  </section>
);

export const getStaticProps: GetStaticProps = async () => {
  const { allPages } = await import('data/pages.json');
  const { aliases } = await import('data/aliases.json');

  // Filter first page that includes home data.
  const filteredPages = allPages.filter(
    (page) => page.properties.Order.number !== 0
  );

  const homepage = allPages.find((page) => page.properties.Order.number === 0);

  const homeData = await NotionService().getBlocks(homepage.id);

  return {
    props: {
      content: homeData,
      pages: filteredPages,
      parsedURLs: aliases,
    },
  };
};

export default IndexPage;
