import Head from 'next/head';
import { getFeaturedProjects,  getAboutContent } from '../lib/api';

function About({projects, aboutContent}) {
    return (
      <>
        <Head>
          <title>ThatGuyJK - About</title>
        </Head>
        <article className='min-h-screen'>
          About page
        </article>
      </>
    );
}

export async function getStaticProps() {
  const featuredProjects = await getFeaturedProjects();
  featuredProjects.forEach(project => {
      delete project['sys'];
      delete project['metadata'];
  });

  const aboutData = await getAboutContent();

  // console.log(aboutData.content[0]);

  return {
      props: {
          projects: featuredProjects,
          aboutContent: "",
      },
  }
}

export default About;