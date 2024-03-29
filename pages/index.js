import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getFeaturedProjects } from "../lib/api";

export default function Home({featuredProjects}) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // setFeatured(featuredProjects);
    // console.log('featured', featuredProjects);
  }, [featuredProjects]);

  const FeaturedProject = ({details}) => {
    return  (
      <Link href={'projects/'+details.fields.slug}>
        <li className="relative transition-color text-xl text-center md:text-5xl px-3 aspect-[4/3] h-32 md:h-96 w-full flex justify-center items-center cursor-pointer hover:text-white">
            <span className='transition-opacity pointer-events-auto w-full h-full absolute inset-0 opacity-0 hover:opacity-100' style={{'backgroundColor': details.fields.primaryColor}}></span>
            <span className='z-10 pointer-events-none'>{details.fields.title}</span>
        </li>
      </Link>
    )
  }

  return (
    <div className="container">
      <Head>
        <title key='title'>The portfolio of Jonathan &quot;ThatGuyJK&quot; Kelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col justify-center items-center pb-0 min-h-[calc(100vh-3.5rem)]'>
        <section className='text-center'>
          <h1 className='text-4xl mb-3 lg:text-7xl'>Jonathan &lsquo;ThatGuyJK&rsquo; Kelly</h1>
          <h2 className='font-nunito text-2xl mb-3 lg:text-5xl'>Software Engineer / Web Developer</h2>
        </section>
        <ul className='grid grid-cols-1 md:grid-cols-2 justify-items-center items-center'>
            {
              featured.map((prj, index) => {
                  return (
                    <FeaturedProject details={prj} key={index} />
                  );
                }) 
            }
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const featuredProjects = await getFeaturedProjects();
  // console.log(featuredProjects);
  return {
    props: {
      featuredProjects: [],
    },
  };
}
