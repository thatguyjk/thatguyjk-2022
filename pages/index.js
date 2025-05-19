import Head from "next/head";
import FeaturedProject from "@/components/FeaturedProject";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects, getHomePageAboutContent } from "@/lib/api";

import { nunito, roboto } from "@/styles/fonts";

export default function Home({ featuredProjects, aboutContent }) {
  return (
    <div className='container'>
      <Head>
        <title key='title'>
          The portfolio of Jonathan &quot;ThatGuyJK&quot; Kelly
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div
          className={`flex flex-col justify-between items-center pb-8 min-h-[100dvh] ${nunito.className}`}
        >
          <section className='text-center mt-auto pt-32'>
            <h1 className='text-4xl mb-3 lg:text-7xl'>
              Jonathan &lsquo;ThatGuyJK&rsquo; Kelly
            </h1>
            <h2 className={`${nunito.className} text-2xl mb-3 lg:text-5xl`}>
              Software Engineer / Web Developer
            </h2>
          </section>
          <div className='mt-auto mb-8'>
            <Image
              src='/down-arrow.svg'
              alt='Scroll Down'
              width={32}
              height={32}
              className='animate-bounce'
              priority
            />
          </div>
        </div>

        <div className='text-justify my-32'>
          <div className='max-w-4xl mx-auto'>
            <p
              className={`text-3xl mb-8 text-pretty md:text-balance ${roboto.className}`}
            >
              {aboutContent}
            </p>
          </div>
        </div>

        <div className='text-center'>
          <h1 className={`text-5xl mb-5 ${nunito.className}`}>
            Featured Projects
          </h1>
          <ul className='grid grid-cols-1 justify-items-center items-center mb-8 md:grid-cols-2'>
            {featuredProjects.map((prj, index) => {
              return <FeaturedProject details={prj} key={index} />;
            })}
            <li>
              <Link href={"projects/"} className='w-full text-xl md:text-5xl'>
                View More...
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const featuredProjects = await getFeaturedProjects();
  const aboutContent = await getHomePageAboutContent();

  return {
    props: {
      featuredProjects: featuredProjects,
      aboutContent: aboutContent,
    },
  };
}
