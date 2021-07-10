import NotionService from 'lib/Notion';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { render, Block } from '@9gustin/react-notion-render';
import {
  Page,
  TitlePropertyValue,
  URLPropertyValue,
} from '@notionhq/client/build/src/api-types';
import Breadcrumb from 'components/Breadcrumb';
import { ParsedPage } from 'types/ParsedPage';
import Paginator from 'components/Paginator';
import Head from 'next/head';

type IncomingProps = {
  slug: string;
  blockMap: Block[];
  pageData: Page;
  nextEntry: ParsedPage;
  prevEntry: ParsedPage;
};

const SectionPage: NextPage<IncomingProps> = ({
  blockMap,
  pageData,
  prevEntry,
  nextEntry,
}) => {
  const { properties } = pageData;

  const titleProperty = properties.Page as TitlePropertyValue;
  const bannerProperty = properties.Banner as URLPropertyValue;

  const pageTitle = titleProperty.title[0].plain_text;
  const pageBanner = bannerProperty.url;

  return (
    <>
      <Head>
        <title>
          {pageTitle} — Learnground: La gamificación aplicada a plataformas de
          E-learning
        </title>
      </Head>
      <section className="max-w-2xl mx-auto space-y-6">
        <Breadcrumb activeRoute={pageTitle} />
        <div className="relative w-full h-60">
          <Image
            src={pageBanner}
            layout="fill"
            objectFit="cover"
            className="rounded max-h-36"
            alt={pageTitle}
          />
        </div>
        <h2 className="text-4xl font-bold text-gray-700 font-heading">
          {pageTitle}
        </h2>
        <article className="prose prose-lg prose-purple">
          {render(blockMap)}
        </article>
        <Paginator next={nextEntry} prev={prevEntry} />
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const { aliases } = await import('data/aliases.json').catch(() => {
    throw new Error(
      '`aliases.json` file not found, please run `yarn generate-data` in order to create it.'
    );
  });

  return {
    paths: aliases.map((alias) => ({ params: { slug: alias.slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  let blockMap = null;
  let pageData = null;
  let prevEntry = null;
  let nextEntry = null;

  const { aliases } = await import('data/aliases.json').catch(() => {
    throw new Error(
      '`aliases.json` file not found, please run `yarn generate-data` in order to create it.'
    );
  });

  if (aliases.length) {
    const current = aliases.find((alias) => alias.slug === slug);

    const currentIndex = aliases.findIndex((alias) => alias === current);

    nextEntry = aliases[currentIndex + 1] || null;
    prevEntry = aliases[currentIndex - 1] || null;

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
      nextEntry,
      prevEntry,
    },
  };
};

export default SectionPage;
