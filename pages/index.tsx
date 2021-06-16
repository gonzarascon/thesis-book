import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import GenerateAliases from "utils/generate-aliases";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  await GenerateAliases(); // On build, generate all slug/id references for pages

  return {
    props: {},
  };
};

export default IndexPage;
