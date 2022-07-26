import Layout from '../components/layout';
import { getFooterLinks } from "../lib/api";

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const footerLinks = await getFooterLinks();

  console.log('here');

  return {
    props: { navLinks: footerLinks },
  };
}

export default MyApp
