import { NextPage } from 'next';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import 'styles/styles.css';
import Layout from 'components/UI/Layout';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
