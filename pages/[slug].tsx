import { GetStaticProps, NextPage } from "next";

type IncomingProps = {
  slug: string;
};

const IndexPage: NextPage<IncomingProps> = ({ slug }) => (
  <>
    <h1>{slug}</h1>
  </>
);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params; // On build, generate all slug/id references for pages

  return {
    props: {
      slug,
    },
  };
};

export default IndexPage;
