import { Page, TitlePropertyValue } from "@notionhq/client/build/src/api-types";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import GenerateAliases from "utils/generate-aliases";

type IncomingProps = {
  pages: Page[];
  parsedURLs: {
    id: string;
    slug: string;
  }[];
};

const IndexPage: NextPage<IncomingProps> = ({ pages, parsedURLs }) => (
  <>
    <h1>Hello Next.js 👋</h1>
    <section className="flex">
      {pages.map((page) => {
        const pageProperty = page.properties.Page as TitlePropertyValue;

        return (
          <Link
            href={parsedURLs.find((url) => url.id === page.id)?.slug || "/"}
          >
            <a className="rounded-md shadow-lg p-6" key={page.id}>
              <h2 className="text-xl font-bold font-heading">
                {pageProperty.title[0].plain_text}
              </h2>
            </a>
          </Link>
        );
      })}
    </section>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { allPages, parsedObjects } = await GenerateAliases(); // On build, generate all slug/id references for pages

  return {
    props: {
      pages: allPages,
      parsedURLs: parsedObjects,
    },
  };
};

export default IndexPage;
