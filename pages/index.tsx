import { Page, TitlePropertyValue } from '@notionhq/client/build/src/api-types';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

type IncomingProps = {
  pages: Page[];
  parsedURLs: {
    id: string;
    slug: string;
  }[];
};

const IndexPage: NextPage<IncomingProps> = ({ pages, parsedURLs }) => (
  <section className="max-w-2xl mx-auto">
    <p className="mb-12">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda
      facilis, nemo esse corrupti recusandae inventore omnis odio, ipsum,
      perferendis nobis autem? Omnis quos cupiditate expedita incidunt nulla,
      necessitatibus voluptates? Accusantium numquam est blanditiis aut harum in
      ullam ipsa, ducimus mollitia quisquam laboriosam accusamus! Enim, sequi ea
      distinctio asperiores, tempora et sapiente consequatur eaque omnis dolore
      eos ducimus atque quo! Debitis tempora quaerat qui ipsam dolorem soluta
      quod, quo odio laborum consequuntur perspiciatis eveniet, quidem
      repudiandae est cumque nemo aut inventore adipisci eius corporis? Nulla
      non quisquam rerum harum iure? Distinctio sapiente at magni amet dolorem
      ab id cum tenetur provident magnam eaque modi natus pariatur, ipsum
      tempora quisquam perferendis recusandae mollitia facere nulla maxime, in
      sint? Repellat, nam sit! Ipsam rerum dolore inventore in porro,
      voluptatibus omnis repellendus quia quas reiciendis? Dolor, iusto ea?
      Obcaecati laborum nobis molestiae suscipit ducimus quas impedit excepturi,
      perspiciatis, quae enim accusamus atque deleniti.
    </p>
    <div className="flex items-center">
      {pages.map((page) => {
        const pageProperty = page.properties.Page as TitlePropertyValue;

        return (
          <Link
            href={parsedURLs.find((url) => url.id === page.id)?.slug || '/'}
          >
            <a
              className="flex items-center h-32 p-6 text-2xl rounded-md shadow-lg font-heading group"
              key={page.id}
            >
              <h2 className="font-bold text-transparent bg-black font-heading group-hover:bg-gradient-to-b group-hover:from-purple-300 group-hover:to-purple-500 bg-clip-text">
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

  return {
    props: {
      pages: allPages,
      parsedURLs: aliases,
    },
  };
};

export default IndexPage;
