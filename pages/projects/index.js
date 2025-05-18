import Head from "next/head";
import Link from "next/link";
import { getAllProjects } from "../../lib/api";

import { nunito, roboto } from "../../styles/fonts";

function Projects({ projects }) {
  return (
    <>
      <Head>
        <title>ThatGuyJK - Projects</title>
      </Head>
      <article className='py-16 min-h-screen'>
        <h5 className={`mb-8 text-4xl ${nunito.className}`}>
          Selected Projects
        </h5>
        <ul className='grid grid-cols-1 md:grid-cols-2 justify-items-center items-center'>
          {projects.map((project, index) => {
            return (
              <Link
                href={`/projects/${project.fields.slug}`}
                key={index}
                className='w-full'
              >
                <li
                  className={`relative transition-color text-xl text-center md:text-5xl px-3 aspect-[4/3] h-32 md:h-96 w-full flex justify-center items-center cursor-pointer hover:text-white ${roboto.className}`}
                >
                  <span
                    className='transition-opacity pointer-events-auto w-full h-full absolute inset-0 opacity-0 hover:opacity-100'
                    style={{ backgroundColor: project.fields.primaryColor }}
                  ></span>
                  <span className='z-10 pointer-events-none'>
                    {project.fields.title}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </article>
    </>
  );
}

export async function getStaticProps() {
  const allProjects = await getAllProjects();

  allProjects.items.forEach((project) => {
    delete project["sys"];
    delete project["metadata"];
  });

  allProjects.items.sort(
    (a, b) => a.fields.projectOrder - b.fields.projectOrder
  );

  return {
    props: {
      projects: allProjects.items,
    },
  };
}

export default Projects;
